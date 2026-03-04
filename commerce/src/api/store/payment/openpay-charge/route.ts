import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { getPaymentGatewayByRegion } from "../../../../modules/payment-gateway"

interface OpenpayChargeRequestBody {
  tokenId: string
  preferenceId: string
  amount: number
  description: string
}

export async function POST(
  req: MedusaRequest<OpenpayChargeRequestBody>,
  res: MedusaResponse
): Promise<void> {
  
  try {
    const { tokenId, preferenceId, amount, description } = req.body as OpenpayChargeRequestBody

    if (!tokenId || !preferenceId || !amount) {
      return
    }

    const cartId = preferenceId.split('-')[0]
    const query = req.scope.resolve("query")
    const { data: carts } = await query.graph({
      entity: "cart",
      fields: [
        "id",
        "email",
        "currency_code",
        "items.*",
        "items.variant.*",
        "items.variant.product.*",
        "shipping_address.*",
        "shipping_methods.*"
      ],
      filters: { id: cartId }
    })

    const cart = carts[0]

    if (!cart) {
      res.status(404).json({ 
        error: "Cart not found",
        success: false 
      })
      return
    }

    const countryCode = (cart.shipping_address?.country_code || "mx").toLowerCase()

    let gateway
    try {
      gateway = await getPaymentGatewayByRegion(countryCode)
    } catch (error: any) {
      res.status(400).json({
        error: `Payment not available for region: ${countryCode}`,
        success: false,
        details: error.message
      })
      return
    }

    if (!('createChargeWithToken' in gateway)) {
      console.error("11. ERROR: Gateway does not support createChargeWithToken")
      res.status(400).json({
        error: "Payment gateway does not support token-based charges",
        success: false
      })
      return
    }

    // Create the charge with the token
    const paymentInfo = await (gateway as any).createChargeWithToken(
      preferenceId,
      tokenId,
      amount,
      description,
      {
        email: cart.email || "customer@example.com",
        firstName: cart.shipping_address?.first_name,
        lastName: cart.shipping_address?.last_name,
      }
    )
    res.json({
      success: true,
      paymentId: paymentInfo.id,
      status: paymentInfo.status,
      amount: paymentInfo.amount,
    })
  } catch (error: any) {

    res.status(500).json({
      success: false,
      error: "Failed to process Openpay charge",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
  }
}
