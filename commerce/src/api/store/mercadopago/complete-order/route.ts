import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Payment } from "mercadopago"
import { Modules } from "@medusajs/framework/utils"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"

interface CompleteOrderRequest {
  cartId: string
  paymentId?: string
}

interface CompleteOrderResponse {
  success: boolean
  orderId?: string
  orderStatus?: string
  paymentStatus?: string
  error?: string
  alreadyCompleted?: boolean
}

/**
 * POST /store/mercadopago/complete-order
 */
export async function POST(
  req: MedusaRequest<CompleteOrderRequest>,
  res: MedusaResponse
): Promise<void> {
  const startTime = Date.now()
  const { cartId, paymentId } = req.body

  console.log(`\n🛒 [MercadoPago] Complete order request for cart: ${cartId}`)

  try {
    if (!cartId) {
      res.status(400).json({ success: false, error: "cartId is required" } as CompleteOrderResponse)
      return
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      res.status(500).json({ success: false, error: "Mercado Pago not configured" } as CompleteOrderResponse)
      return
    }

    const query = req.scope.resolve("query")

    const existingOrder = await findOrderByCartId(query, cartId)
    if (existingOrder) {
      res.json({
        success: true,
        orderId: existingOrder.id,
        orderStatus: existingOrder.status,
        alreadyCompleted: true,
      } as CompleteOrderResponse)
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
      res.status(404).json({ success: false, error: "Cart not found" } as CompleteOrderResponse)
      return
    }

    if (cart.completed_at) {
      const order = await findOrderByCartId(query, cartId)
      if (order) {
        res.json({
          success: true,
          orderId: order.id,
          alreadyCompleted: true,
        } as CompleteOrderResponse)
        return
      }
    }

    let mpPaymentInfo: any = null
    if (paymentId) {
      const client = new MercadoPagoConfig({ accessToken })
      const paymentApi = new Payment(client)
      try {
        mpPaymentInfo = await paymentApi.get({ id: paymentId })
        console.log(`💳 MP Payment status: ${mpPaymentInfo.status}`)
      } catch (err: any) {
        console.warn(`⚠️ Could not fetch payment info: ${err.message}`)
      }
    }

    if (mpPaymentInfo) {
      const mpCartId = mpPaymentInfo.external_reference || mpPaymentInfo.metadata?.cart_id
      if (mpCartId !== cartId) {
        res.status(400).json({ 
          success: false, 
          error: "Payment does not match cart" 
        } as CompleteOrderResponse)
        return
      }

      if (mpPaymentInfo.status !== "approved") {
        res.status(400).json({
          success: false,
          error: `Payment not approved. Status: ${mpPaymentInfo.status}`,
          paymentStatus: mpPaymentInfo.status,
        } as CompleteOrderResponse)
        return
      }
    }


    const paymentSession = cart.payment_collection?.payment_sessions?.find(
      (s: any) => s.provider_id === "pp_mercadopago_mercadopago" || s.provider_id?.includes("mercadopago")
    )

    if (paymentSession && paymentSession.status !== "authorized") {
      const paymentModule = req.scope.resolve(Modules.PAYMENT)
      
      try {
        await paymentModule.authorizePaymentSession(paymentSession.id, {
          mercadopago_payment_id: paymentId || mpPaymentInfo?.id,
          status: "approved",
        })
      } catch (err: any) {
        console.warn(`⚠️ Could not authorize payment session: ${err.message}`)
        // Continue anyway - the completeCartWorkflow might handle this
      }
    }

    console.log(`🚀 Completing cart workflow...`)
    const workflowResult = await completeCartWorkflow(req.scope).run({
      input: { id: cartId },
    })

    console.log(`📦 Workflow result:`, JSON.stringify(workflowResult, null, 2))

    const result = workflowResult?.result as any
    // Result can be { order: { id } } or { id } depending on Medusa version
    const orderId = result?.order?.id || result?.id

    if (orderId) {
      const elapsed = Date.now() - startTime
      console.log(`✅ Order created: ${orderId} in ${elapsed}ms`)

      // Store order_id in cart metadata for future lookups
      try {
        const cartModule = req.scope.resolve(Modules.CART)
        await cartModule.updateCarts([{
          id: cartId,
          metadata: {
            ...(cart.metadata || {}),
            order_id: orderId
          }
        }])
      } catch (err) {
        console.warn(`Could not update cart metadata: ${err}`)
      }

      res.json({
        success: true,
        orderId: orderId,
        orderStatus: "completed",
        paymentStatus: mpPaymentInfo?.status || "approved",
      } as CompleteOrderResponse)
    } else {
      console.error(`❌ Cart completion failed:`, result)
      res.status(400).json({
        success: false,
        error: "Could not complete order. Cart may be missing required data.",
      } as CompleteOrderResponse)
    }
  } catch (error: any) {
    console.error(`❌ Error completing order:`, error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to complete order",
    } as CompleteOrderResponse)
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
      // Order exists, fetch it
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
    console.error("Error finding order by cart ID:", err)
    return null
  }
}

