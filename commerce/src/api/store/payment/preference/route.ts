import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { getPaymentGatewayByRegion, clearGatewayCache } from "../../../../modules/payment-gateway"

interface PreferenceRequestBody {
  cartId: string
}

export async function POST(
  req: MedusaRequest<PreferenceRequestBody>,
  res: MedusaResponse
): Promise<void> {
  console.log("=== POST /store/payment/preference called ===")
  
  clearGatewayCache()
  
  try {
    console.log("1. Parsing request body...")
    const { cartId } = req.body as PreferenceRequestBody

    if (!cartId) {
      console.log("2. ERROR: cartId is required")
      res.status(400).json({ error: "cartId is required" })
      return
    }

    console.log(`2. cartId: ${cartId}`)
    console.log("3. Fetching cart from database...")
    
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

    console.log(`4. Found ${carts.length} carts`)

    const cart = carts[0]

    if (!cart) {
      console.log("5. ERROR: Cart not found")
      res.status(404).json({ error: "Cart not found" })
      return
    }

    console.log("5. Cart found")

    if (!cart.currency_code) {
      console.log("6. ERROR: Cart has no currency code")
      res.status(400).json({ 
        error: "Cart does not have a currency configured. Please ensure the cart has a valid region." 
      })
      return
    }

    console.log(`6. Currency: ${cart.currency_code}`)
    
    const countryCode = (cart.shipping_address?.country_code || "br").toLowerCase()
    console.log(`7. Country code: ${countryCode}`)

    let gateway
    try {
      console.log("8. Getting payment gateway...")
      gateway = await getPaymentGatewayByRegion(countryCode)
      console.log(`9. Gateway obtained: ${gateway.constructor.name}`)
    } catch (error: any) {
      console.error("9. ERROR getting gateway:", error.message)
      res.status(400).json({
        error: `Payment not available for region: ${countryCode}`,
        details: error.message
      })
      return
    }

    const frontendUrl = process.env.STORE_URL || "http://localhost:8000"

    const items = cart.items.map((item: any) => ({
      id: item.id,
      title: item.variant?.product?.title || item.title || "Product",
      description: item.variant?.product?.description,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price || 0),
      currencyId: cart.currency_code.toUpperCase(),
    }))

    console.log("10. Raw cart items from Medusa:")
    cart.items.forEach((item: any) => {
      console.log(`  - ${item.variant?.product?.title}: unit_price=${item.unit_price}, type=${typeof item.unit_price}`)
    })

    const shippingTotal = cart.shipping_methods?.[0]?.amount || 0
    if (shippingTotal > 0) {
      items.push({
        id: "shipping",
        title: "Envío",
        description: "Costo de envío",
        quantity: 1,
        unitPrice: Number(shippingTotal),
        currencyId: cart.currency_code.toUpperCase(),
      })
    }

    const successUrl = `${frontendUrl}/${countryCode}/checkout/success?cartId=${cartId}`
    const failureUrl = `${frontendUrl}/${countryCode}/checkout/failure?cartId=${cartId}`
    const pendingUrl = `${frontendUrl}/${countryCode}/checkout/pending?cartId=${cartId}`

    const preferenceInput = {
      items,
      payer: {
        email: cart.email || "customer@example.com",
        firstName: cart.shipping_address?.first_name || undefined,
        lastName: cart.shipping_address?.last_name || undefined,
        address: cart.shipping_address ? {
          streetName: cart.shipping_address.address_1 || undefined,
          streetNumber: "",
          zipCode: cart.shipping_address.postal_code || undefined,
        } : undefined,
      },
      externalReference: cartId,
      backUrls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      metadata: { cart_id: cartId },
      autoReturn: frontendUrl.includes('localhost') ? undefined : "approved",
    }

    console.log("11. Calling createPreference...")

    const result = await gateway.createPreference(preferenceInput)
    
    console.log("12. Preference created successfully:", result)

    res.json({
      preferenceId: result.preferenceId,
      initPoint: result.initPoint,
      sandboxInitPoint: result.sandboxInitPoint,
    })
  } catch (error: any) {
    console.error("ERROR in POST /store/payment/preference:", error)
    console.error("Error stack:", error.stack)
    res.status(500).json({
      error: "Failed to create payment preference",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
  }
}
