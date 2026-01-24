import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { getPaymentGatewayByRegion } from "../../../../modules/payment-gateway"
import type { PaymentInfo } from "../../../../modules/payment-gateway"

export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  try {
    const body = req.body as any

    const webhookPayload = {
      type: body.type,
      action: body.action,
      data: body.data,
      headers: {
        signature: req.headers["x-signature"] as string | undefined,
        requestId: req.headers["x-request-id"] as string | undefined,
      },
    }

    const cartId = body.data?.id || body.data?.external_reference
    if (!cartId) {
      res.status(400).json({ error: "No cart ID found in webhook" })
      return
    }

    const query = req.scope.resolve("query")
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "shipping_address.*"],
      filters: { id: cartId },
    })

    const cart = carts?.[0]
    const region = cart?.shipping_address?.country_code?.toLowerCase() || "br"

    let gateway
    try {
      gateway = await getPaymentGatewayByRegion(region)
    } catch (error: any) {
      console.error(`Webhook error: Payment gateway not available for region ${region}`)
      res.status(400).json({ error: `Payment not available for region: ${region}` })
      return
    }

    const result = await gateway.processWebhook(webhookPayload)

    if (!result.valid) {
      res.status(401).json({ error: result.error || "Invalid signature" })
      return
    }

    if (result.type === "payment" && result.paymentInfo) {
      const paymentCartId = result.paymentInfo.externalReference ||
                     (result.paymentInfo.metadata?.cart_id as string | undefined)

      if (!paymentCartId || typeof paymentCartId !== "string") {
        res.status(400).json({ error: "No cart ID found" })
        return
      }

      await updateCartPaymentTracking(req, paymentCartId as string, result.paymentInfo)
      await updatePaymentSessionData(req, paymentCartId as string, result.paymentInfo)

      if (result.paymentInfo.status === "approved") {
        await handleApprovedPayment(req, paymentCartId as string, result.paymentInfo)
      }
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
  paymentInfo: PaymentInfo
): Promise<void> {
  const query = req.scope.resolve("query")

  const existingOrder = await findOrderByCartId(query, cartId)
  if (existingOrder) {
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

async function updateCartPaymentTracking(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: PaymentInfo
): Promise<void> {
  try {
    const cartModule = req.scope.resolve(Modules.CART)
    const query = req.scope.resolve("query")

    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "metadata"],
      filters: { id: cartId },
    })

    const cart = carts?.[0]
    const currentMetadata = cart?.metadata || {}

    const historyEntry = {
      status: paymentInfo.status,
      status_detail: paymentInfo.statusDetail,
      payment_id: paymentInfo.id,
      timestamp: new Date().toISOString(),
    }

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
        mp_status_detail: paymentInfo.statusDetail,
        mp_payment_id: paymentInfo.id,
        mp_last_webhook_at: new Date().toISOString(),
        mp_payment_history: paymentHistory,
      }
    }])

  } catch (err: any) {
    console.warn(`Could not update cart metadata: ${err.message}`)
  }
}

async function updatePaymentSessionData(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: PaymentInfo
): Promise<void> {
  try {
    const query = req.scope.resolve("query")
    const paymentModule = req.scope.resolve(Modules.PAYMENT)

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

    const currentData = paymentSession.data || {}
    await paymentModule.updatePaymentSession({
      id: paymentSession.id,
      currency_code: paymentSession.currency_code,
      amount: paymentSession.amount,
      data: {
        ...currentData,
        mp_status: paymentInfo.status,
        mp_status_detail: paymentInfo.statusDetail,
        mp_payment_id: paymentInfo.id,
        mp_payment_method_id: paymentInfo.paymentMethodId,
        mp_payment_type_id: paymentInfo.paymentTypeId,
        mp_last_updated: new Date().toISOString(),
      }
    })

  } catch (err: any) {
    console.warn(`Could not update payment session: ${err.message}`)
  }
}
