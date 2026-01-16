import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Payment } from "mercadopago"
import crypto from "crypto"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

function validateWebhookSignature(
  xSignature: string | undefined,
  xRequestId: string | undefined,
  dataId: string,
  webhookSecret: string
): boolean {
  if (!xSignature || !xRequestId || !webhookSecret) {
    if (process.env.NODE_ENV === "development" && !webhookSecret) {
      console.warn("Webhook signature validation skipped (no secret configured)")
      return true
    }
    return false
  }

  const parts = xSignature.split(",")
  const tsMatch = parts.find(p => p.startsWith("ts="))
  const v1Match = parts.find(p => p.startsWith("v1="))

  if (!tsMatch || !v1Match) {
    return false
  }

  const ts = tsMatch.replace("ts=", "")
  const receivedHash = v1Match.replace("v1=", "")
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const expectedHash = crypto
    .createHmac("sha256", webhookSecret)
    .update(manifest)
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(receivedHash),
    Buffer.from(expectedHash)
  )
}

interface WebhookPayload {
  type: string
  action?: string
  data: {
    id: string
  }
}

export async function POST(
  req: MedusaRequest<WebhookPayload>,
  res: MedusaResponse
): Promise<void> {
  const { type, data } = req.body as WebhookPayload

  try {
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    const xSignature = req.headers["x-signature"] as string | undefined
    const xRequestId = req.headers["x-request-id"] as string | undefined

    if (webhookSecret && !validateWebhookSignature(xSignature, xRequestId, data?.id?.toString(), webhookSecret)) {
      console.error("Invalid webhook signature")
      res.status(401).json({ error: "Invalid signature" })
      return
    }

    if (type !== "payment") {
      res.status(200).json({ received: true })
      return
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      res.status(500).json({ error: "Mercado Pago not configured" })
      return
    }

    const client = new MercadoPagoConfig({ accessToken })
    const paymentApi = new Payment(client)
    const paymentInfo = await paymentApi.get({ id: data.id })

    const cartId = paymentInfo.external_reference || paymentInfo.metadata?.cart_id

    if (!cartId) {
      console.error("No cart ID found in payment")
      res.status(400).json({ error: "No cart ID found" })
      return
    }

    // Always track payment status in cart metadata and payment session
    await updateCartPaymentTracking(req, cartId, paymentInfo)
    await updatePaymentSessionData(req, cartId, paymentInfo)

    switch (paymentInfo.status) {
      case "approved":
        await handleApprovedPayment(req, cartId, paymentInfo)
        break
      case "rejected":
        // console.log(`❌ Payment rejected for cart ${cartId}: ${paymentInfo.status_detail}`)
        break
      case "pending":
      case "in_process":
        // console.log(`⏳ Payment pending for cart ${cartId}`)
        break
      case "cancelled":
        // console.log(`🚫 Payment cancelled for cart ${cartId}`)
        break
      default:
        // console.log(`ℹ️ Unhandled payment status: ${paymentInfo.status}`)
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error.message)
    res.status(500).json({ error: "Webhook processing failed" })
  }
}


async function handleApprovedPayment(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: any
): Promise<void> {
  const query = req.scope.resolve("query")

  // Check if order already exists (idempotency)
  const existingOrder = await findOrderByCartId(query, cartId)
  if (existingOrder) {
    // console.log(`✅ Order already exists for cart ${cartId}: ${existingOrder.id}`)
    return
  }

  const { data: carts } = await query.graph({
    entity: "cart",
    fields: [
      "id",
      "completed_at",
      "payment_collection.*",
      "payment_collection.payment_sessions.*",
    ],
    filters: { id: cartId },
  })

  const cart = carts[0]
  if (!cart) {
    console.error(` Cart ${cartId} not found`)
    return
  }


  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.provider_id?.includes("mercadopago")
  )

  if (paymentSession && paymentSession.status !== "authorized") {
    try {
      const paymentModule = req.scope.resolve(Modules.PAYMENT)
      await paymentModule.authorizePaymentSession(paymentSession.id, {
        mercadopago_payment_id: paymentInfo.id,
        status: "approved",
      })
    } catch (err: any) {
      console.warn(`Could not authorize session: ${err.message}`)
    }
  }

  try {
    const { result } = await completeCartWorkflow(req.scope).run({
      input: { id: cartId },
    }) as { result: any }

    const orderId = result?.order?.id || result?.id

    if (orderId) {
      try {
        const cartModule = req.scope.resolve(Modules.CART)
        await cartModule.updateCarts([{
          id: cartId,
          metadata: { order_id: orderId }
        }])
      } catch (err) {
        console.warn(`Could not update cart metadata: ${err}`)
      }
    } else {
      console.error(` Cart completion failed for ${cartId}`)
    }
  } catch (err: any) {
    console.error(` Workflow error: ${err.message}`)
    throw err
  }
}

async function findOrderByCartId(query: any, cartId: string): Promise<any | null> {
  try {
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "metadata", "completed_at"],
      filters: { id: cartId },
    })

    const cart = carts?.[0]
    if (cart?.metadata?.order_id) {
      const { data: orders } = await query.graph({
        entity: "order",
        fields: ["id", "status"],
        filters: { id: cart.metadata.order_id },
      })

      if (orders && orders.length > 0) {
        return orders[0]
      }
    }

    return null
  } catch (err) {
    return null
  }
}

/**
 * Track payment status in cart metadata for visibility/auditing
 */
async function updateCartPaymentTracking(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: any
): Promise<void> {
  try {
    const cartModule = req.scope.resolve(Modules.CART)
    const query = req.scope.resolve("query")

    // Get current cart metadata
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "metadata"],
      filters: { id: cartId },
    })

    const cart = carts?.[0]
    const currentMetadata = cart?.metadata || {}

    // Build payment history entry
    const historyEntry = {
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail,
      payment_id: paymentInfo.id?.toString(),
      timestamp: new Date().toISOString(),
    }

    // Append to payment history (keep last 10 entries)
    const existingHistory = currentMetadata.mp_payment_history
    const paymentHistory: typeof historyEntry[] = Array.isArray(existingHistory)
      ? [...existingHistory, historyEntry]
      : [historyEntry]
    if (paymentHistory.length > 10) {
      paymentHistory.shift()
    }

    await cartModule.updateCarts([{
      id: cartId,
      metadata: {
        ...currentMetadata,
        mp_status: paymentInfo.status,
        mp_status_detail: paymentInfo.status_detail,
        mp_payment_id: paymentInfo.id?.toString(),
        mp_last_webhook_at: new Date().toISOString(),
        mp_payment_history: paymentHistory,
      }
    }])

  } catch (err: any) {
    console.warn(`Could not update cart metadata: ${err.message}`)
  }
}

/**
 * Update payment session data with MP payment status
 */
async function updatePaymentSessionData(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: any
): Promise<void> {
  try {
    const query = req.scope.resolve("query")
    const paymentModule = req.scope.resolve(Modules.PAYMENT)

    // Get cart with payment sessions
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: [
        "id",
        "payment_collection.*",
        "payment_collection.payment_sessions.*",
      ],
      filters: { id: cartId },
    })

    const cart = carts?.[0]
    const paymentSession = cart?.payment_collection?.payment_sessions?.find(
      (s: any) => s.provider_id?.includes("mercadopago")
    )

    if (!paymentSession) {
      return
    }

    // Update payment session data with MP status info
    const currentData = paymentSession.data || {}
    await paymentModule.updatePaymentSession({
      id: paymentSession.id,
      currency_code: paymentSession.currency_code,
      amount: paymentSession.amount,
      data: {
        ...currentData,
        mp_status: paymentInfo.status,
        mp_status_detail: paymentInfo.status_detail,
        mp_payment_id: paymentInfo.id?.toString(),
        mp_payment_method_id: paymentInfo.payment_method_id,
        mp_payment_type_id: paymentInfo.payment_type_id,
        mp_last_updated: new Date().toISOString(),
      }
    })

  } catch (err: any) {
    console.warn(`Could not update payment session: ${err.message}`)
  }
}
