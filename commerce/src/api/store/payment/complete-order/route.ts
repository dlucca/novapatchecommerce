import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { completeCartWorkflow } from "@medusajs/medusa/core-flows"
import { getPaymentGatewayByRegion } from "../../../../modules/payment-gateway"

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

export async function POST(
  req: MedusaRequest<CompleteOrderRequest>,
  res: MedusaResponse
): Promise<void> {
  const { cartId, paymentId } = req.body

  try {
    if (!cartId) {
      res.status(400).json({ success: false, error: "cartId is required" } as CompleteOrderResponse)
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
        "shipping_address.*",
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

    const region = cart.shipping_address?.country_code?.toLowerCase() || "br"

    let paymentInfo: any = null
    if (paymentId) {
      try {
        const gateway = await getPaymentGatewayByRegion(region)
        paymentInfo = await gateway.getPayment(paymentId)
      } catch (err: any) {
        console.warn(`Could not fetch payment info: ${err.message}`)
      }
    }

    if (paymentInfo) {
      const paymentCartReference =
        paymentInfo.externalReference || paymentInfo.metadata?.cart_id
      const matchesCart =
        paymentCartReference === cartId ||
        (typeof paymentCartReference === "string" &&
          paymentCartReference.startsWith(`${cartId}-`))

      if (!matchesCart) {
        res.status(400).json({ 
          success: false, 
          error: "Payment does not match cart" 
        } as CompleteOrderResponse)
        return
      }

      if (paymentInfo.status !== "approved") {
        res.status(400).json({
          success: false,
          error: `Payment not approved. Status: ${paymentInfo.status}`,
          paymentStatus: paymentInfo.status,
        } as CompleteOrderResponse)
        return
      }
    }


    const paymentSession = cart.payment_collection?.payment_sessions?.find(
      (s: any) =>
        s.provider_id?.includes("mercadopago") ||
        s.provider_id?.includes("openpay") ||
        s.provider_id?.includes("system_default")
    )

    const authorizeSessionIfNeeded = async () => {
      if (!paymentSession || paymentSession.status === "authorized") {
        return
      }

      const paymentModule = req.scope.resolve(Modules.PAYMENT)
      const isOpenpaySession = paymentSession.provider_id?.includes("openpay")
      const isMercadoPagoSession = paymentSession.provider_id?.includes("mercadopago")

      const authorizePayload = {
        status: "approved",
        ...(isOpenpaySession && (paymentId || paymentInfo?.id)
          ? { openpay_payment_id: paymentId || paymentInfo?.id }
          : {}),
        ...(isMercadoPagoSession && (paymentId || paymentInfo?.id)
          ? { mercadopago_payment_id: paymentId || paymentInfo?.id }
          : {}),
      }

      await paymentModule.authorizePaymentSession(paymentSession.id, {
        ...authorizePayload,
      })
    }

    if (paymentSession && paymentSession.status !== "authorized") {
      try {
        await authorizeSessionIfNeeded()
      } catch (err: any) {
        console.warn(`Could not authorize payment session (first attempt): ${err.message}`)
      }
    }

    let workflowResult: any
    let completionError: any = null
    try {
      workflowResult = await completeCartWorkflow(req.scope).run({
        input: { id: cartId },
      })
    } catch (workflowError: any) {
      completionError = workflowError
      if (paymentSession && paymentSession.status !== "authorized") {
        try {
          await authorizeSessionIfNeeded()
          workflowResult = await completeCartWorkflow(req.scope).run({
            input: { id: cartId },
          })
          completionError = null
        } catch (retryError: any) {
          completionError = retryError
        }
      }
    }

    let orderId = (workflowResult?.result as any)?.order?.id || (workflowResult?.result as any)?.id

    if (!orderId && completionError?.message?.includes("shipping profiles")) {
        const fallbackOrderId = await createOrderFromCartFallback(req, cartId)
        orderId = fallbackOrderId
    }

    if (orderId) {
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
        paymentStatus: paymentInfo?.status || "approved",
      } as CompleteOrderResponse)
    } else {
      if (completionError) {
        throw completionError
      }

      console.error(`Cart completion failed without order ID for cart ${cartId}`)
      res.status(500).json({
        success: false,
        error: "Could not complete order. Cart may be missing required data or shipping method.",
      } as CompleteOrderResponse)
    }
  } catch (error: any) {
    console.error(`Error completing order:`, error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to complete order",
    } as CompleteOrderResponse)
  }
}

async function createOrderFromCartFallback(
  req: MedusaRequest,
  cartId: string
): Promise<string> {
  const query = req.scope.resolve("query")
  const orderModuleService = req.scope.resolve(Modules.ORDER) as any

  const { data: carts } = await query.graph({
    entity: "cart",
    fields: [
      "id",
      "currency_code",
      "customer_id",
      "region_id",
      "email",
      "metadata",
      "items.*",
      "shipping_address.*",
      "billing_address.*",
    ],
    filters: { id: cartId },
  })

  const cart = carts?.[0]
  if (!cart) {
    throw new Error("Cart not found for fallback order creation")
  }

  const orders = await orderModuleService.createOrders({
    currency_code: cart.currency_code,
    customer_id: cart.customer_id,
    region_id: cart.region_id,
    items:
      cart.items?.map((item: any) => ({
        title: item.title || item.product_title || item.variant_title || "Product",
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        thumbnail: item.thumbnail,
        product_id: item.product_id,
        product_title: item.product_title,
        product_description: item.product_description,
        product_subtitle: item.product_subtitle,
        product_type: item.product_type,
        product_collection: item.product_collection,
        product_handle: item.product_handle,
        variant_title: item.variant_title,
        variant_sku: item.variant_sku,
        variant_barcode: item.variant_barcode,
        requires_shipping: item.requires_shipping,
        is_discountable: item.is_discountable,
        is_tax_inclusive: item.is_tax_inclusive,
        metadata: item.metadata,
      })) || [],
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    email: cart.email,
    metadata: {
      ...(cart.metadata || {}),
      payment_fallback_created: true,
      fallback_source: "complete-order-shipping-profile",
      source_cart_id: cartId,
    },
  })

  const createdOrder = Array.isArray(orders) ? orders[0] : orders
  if (!createdOrder?.id) {
    throw new Error("Fallback order creation failed")
  }

  return createdOrder.id
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
    console.error("Error finding order by cart ID:", err)
    return null
  }
}
