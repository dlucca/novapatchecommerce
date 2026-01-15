import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Payment } from "mercadopago"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { type, data } = req.body

    // Solo procesar notificaciones de pago
    if (type !== "payment") {
      res.status(200).json({ received: true })
      return
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      res.status(500).json({ error: "Mercado Pago not configured" })
      return
    }

    // Obtener información del pago
    const client = new MercadoPagoConfig({ accessToken })
    const payment = new Payment(client)
    const paymentInfo = await payment.get({ id: data.id })

    const cartId = paymentInfo.external_reference || paymentInfo.metadata?.cart_id

    if (!cartId) {
      console.error("No cart ID found in payment")
      res.status(400).json({ error: "No cart ID found" })
      return
    }

    // Aquí puedes actualizar el estado del pago en tu base de datos
    // dependiendo del estado del pago: approved, rejected, pending, etc.

    switch (paymentInfo.status) {
      case "approved":
        // TODO: Actualizar estado del pago y crear la orden
        break
      case "rejected":
        break
      case "pending":
        break
      default:
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.error("Error processing Mercado Pago webhook:", error)
    res.status(500).json({ error: "Webhook processing failed" })
  }
}
