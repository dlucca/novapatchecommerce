import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { getPaymentGatewayByRegion } from "../../../../modules/payment-gateway"

interface OrderStatusResponse {
  status: "pending" | "processing" | "completed" | "failed"
  orderId?: string
  paymentStatus?: string
  message?: string
}

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
      fields: ["id", "completed_at", "metadata", "shipping_address.*"],
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
      const region = cart.shipping_address?.country_code?.toLowerCase() || "br"
      
      try {
        const gateway = await getPaymentGatewayByRegion(region)
        const paymentInfo = await gateway.getPayment(paymentId)

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
            message: `Payment rejected: ${paymentInfo.statusDetail}`,
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
        console.warn(`Could not fetch payment info: ${err}`)
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
