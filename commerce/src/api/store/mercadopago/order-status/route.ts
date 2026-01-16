import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Payment } from "mercadopago"

interface OrderStatusResponse {
  status: "pending" | "processing" | "completed" | "failed"
  orderId?: string
  paymentStatus?: string
  message?: string
}

/**
 * GET /store/mercadopago/order-status?cartId=xxx&paymentId=xxx
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { cartId, paymentId } = req.query as { cartId?: string; paymentId?: string }

  if (!cartId) {
    res.status(400).json({ status: "failed", message: "cartId is required" } as OrderStatusResponse)
    return
  }

  try {
    const query = req.scope.resolve("query")

    const { data: carts } = await query.graph({
      entity: "cart",
      fields: ["id", "completed_at", "metadata"],
      filters: { id: cartId },
    })

    const cart = carts?.[0]

    if (!cart) {
      res.status(404).json({ status: "failed", message: "Cart not found" } as OrderStatusResponse)
      return
    }

    if (cart.metadata?.order_id) {
      res.json({
        status: "completed",
        orderId: cart.metadata.order_id as string,
        message: "Order created successfully",
      } as OrderStatusResponse)
      return
    }

    if (cart.completed_at) {
      res.json({
        status: "processing",
        message: "Order is being processed",
      } as OrderStatusResponse)
      return
    }

    if (paymentId) {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
      if (accessToken) {
        try {
          const client = new MercadoPagoConfig({ accessToken })
          const paymentApi = new Payment(client)
          const paymentInfo = await paymentApi.get({ id: paymentId })

          if (paymentInfo.status === "approved") {
            res.json({
              status: "processing",
              paymentStatus: "approved",
              message: "Payment approved, creating order...",
            } as OrderStatusResponse)
            return
          } else if (paymentInfo.status === "rejected") {
            res.json({
              status: "failed",
              paymentStatus: "rejected",
              message: `Payment rejected: ${paymentInfo.status_detail}`,
            } as OrderStatusResponse)
            return
          } else {
            res.json({
              status: "pending",
              paymentStatus: paymentInfo.status,
              message: "Payment still processing",
            } as OrderStatusResponse)
            return
          }
        } catch (err) {
          // Couldn't get payment info, continue
        }
      }
    }

    res.json({
      status: "pending",
      message: "Waiting for payment confirmation",
    } as OrderStatusResponse)
  } catch (error: any) {
    console.error("Error checking order status:", error)
    res.status(500).json({
      status: "failed",
      message: error.message || "Failed to check order status",
    } as OrderStatusResponse)
  }
}

