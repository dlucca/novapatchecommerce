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
  console.log("=== POST /store/payment/openpay-charge called ===")
  
  try {
    console.log("1. Parsing request body...")
    const { tokenId, preferenceId, amount, description } = req.body as OpenpayChargeRequestBody

    if (!tokenId || !preferenceId || !amount) {
      console.log("2. ERROR: Missing required fields")
      res.status(400).json({ 
        error: "tokenId, preferenceId, and amount are required",
        success: false 
      })
      return
    }

    console.log(`2. Token: ${tokenId.substring(0, 20)}...`)
    console.log(`3. Preference ID: ${preferenceId}`)
    console.log(`4. Amount: ${amount}`)

    // Get the cart from the preferenceId (it should be in the format: cartId-timestamp)
    const cartId = preferenceId.split('-')[0]
    console.log(`5. Extracted cart ID: ${cartId}`)

    // Get cart to retrieve payer info and validate amount
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

    console.log(`6. Found ${carts.length} carts`)

    const cart = carts[0]

    if (!cart) {
      console.log("7. ERROR: Cart not found")
      res.status(404).json({ 
        error: "Cart not found",
        success: false 
      })
      return
    }

    console.log("7. Cart found")

    const countryCode = (cart.shipping_address?.country_code || "mx").toLowerCase()
    console.log(`8. Country code: ${countryCode}`)

    let gateway
    try {
      console.log("9. Getting payment gateway...")
      gateway = await getPaymentGatewayByRegion(countryCode)
      console.log(`10. Gateway obtained: ${gateway.constructor.name}`)
    } catch (error: any) {
      console.error("10. ERROR getting gateway:", error.message)
      res.status(400).json({
        error: `Payment not available for region: ${countryCode}`,
        success: false,
        details: error.message
      })
      return
    }

    // Check if gateway has createChargeWithToken method (Openpay-specific)
    if (!('createChargeWithToken' in gateway)) {
      console.error("11. ERROR: Gateway does not support createChargeWithToken")
      res.status(400).json({
        error: "Payment gateway does not support token-based charges",
        success: false
      })
      return
    }

    console.log("11. Creating charge with token...")

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

    console.log("12. Charge created successfully:")
    console.log(`  - ID: ${paymentInfo.id}`)
    console.log(`  - Status: ${paymentInfo.status}`)
    console.log(`  - Amount: ${paymentInfo.amount}`)

    res.json({
      success: true,
      paymentId: paymentInfo.id,
      status: paymentInfo.status,
      amount: paymentInfo.amount,
    })
  } catch (error: any) {
    console.error("ERROR in POST /store/payment/openpay-charge:", error)
    console.error("Error stack:", error.stack)
    res.status(500).json({
      success: false,
      error: "Failed to process Openpay charge",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
  }
}
