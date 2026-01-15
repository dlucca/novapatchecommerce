import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Payment } from "mercadopago"
import crypto from "crypto"
import { Modules } from "@medusajs/framework/utils"

/**
 * Validates the Mercado Pago webhook signature
 * @see https://www.mercadopago.com.br/developers/en/docs/your-integrations/notifications/webhooks
 */
function validateWebhookSignature(
  xSignature: string | undefined,
  xRequestId: string | undefined,
  dataId: string,
  webhookSecret: string
): boolean {
  if (!xSignature || !xRequestId || !webhookSecret) {
    if (process.env.NODE_ENV === "development" && !webhookSecret) {
      console.warn("⚠️ Webhook signature validation skipped (no secret configured)")
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
  data: {
    id: string
  }
}

export async function POST(
  req: MedusaRequest<WebhookPayload>,
  res: MedusaResponse
): Promise<void> {
  try {
    const { type, data } = req.body as WebhookPayload

    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    const xSignature = req.headers["x-signature"] as string | undefined
    const xRequestId = req.headers["x-request-id"] as string | undefined

    if (webhookSecret && !validateWebhookSignature(xSignature, xRequestId, data?.id?.toString(), webhookSecret)) {
      console.error("❌ Invalid webhook signature")
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
    const payment = new Payment(client)
    const paymentInfo = await payment.get({ id: data.id })

    const cartId = paymentInfo.external_reference || paymentInfo.metadata?.cart_id

    if (!cartId) {
      console.error("No cart ID found in payment")
      res.status(400).json({ error: "No cart ID found" })
      return
    }


    // Procesar según el estado del pago
    switch (paymentInfo.status) {
      case "approved":
        await handleApprovedPayment(req, cartId, paymentInfo)
        break
      case "rejected":
        console.log(`❌ Payment rejected for cart ${cartId}`)
        break
      case "pending":
      case "in_process":
        console.log(`⏳ Payment pending for cart ${cartId}`)
        break
      case "cancelled":
        console.log(`🚫 Payment cancelled for cart ${cartId}`)
        break
      default:
        console.log(`ℹ️ Unhandled payment status: ${paymentInfo.status}`)
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.error("❌ Error processing Mercado Pago webhook:", error)
    res.status(500).json({ error: "Webhook processing failed" })
  }
}

/**
 * Handle approved payment: complete the cart and create the order
 */
async function handleApprovedPayment(
  req: MedusaRequest,
  cartId: string,
  paymentInfo: any
): Promise<void> {
  try {
    const cartService = req.scope.resolve(Modules.CART)

    // Check if order already exists for this cart (idempotency)
    const query = req.scope.resolve("query")
    const { data: existingOrders } = await query.graph({
      entity: "order",
      fields: ["id", "metadata"],
    })

    // Check if any order has this cartId in metadata
    const orderExists = existingOrders?.some((order: any) =>
      order.metadata?.cart_id === cartId ||
      order.metadata?.mercadopago_cart_id === cartId
    )

    if (orderExists) {
      console.log(`✅ Order already exists for cart ${cartId}, skipping`)
      return
    }

    // Get the cart
    const cart = await cartService.retrieveCart(cartId, {
      relations: ["items", "shipping_address", "billing_address", "payment_collection"]
    })

    if (!cart) {
      console.error(`❌ Cart ${cartId} not found`)
      return
    }

    // Store payment info in cart metadata
    await cartService.updateCarts([{
      id: cartId,
      metadata: {
        ...cart.metadata,
        mercadopago_payment_id: paymentInfo.id,
        mercadopago_status: paymentInfo.status,
        mercadopago_status_detail: paymentInfo.status_detail,
        payment_completed_at: new Date().toISOString()
      }
    }])

    console.log(`✅ Payment approved for cart ${cartId}`)
    console.log(`   Payment ID: ${paymentInfo.id}`)
    console.log(`   Amount: ${paymentInfo.transaction_amount} ${paymentInfo.currency_id}`)

    // Note: The actual order completion should be handled by Medusa's payment flow
    // The payment provider plugin should capture the payment and trigger order creation
    // This webhook serves as a backup verification

  } catch (error) {
    console.error(`❌ Error handling approved payment for cart ${cartId}:`, error)
    throw error
  }
}
