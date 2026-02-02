import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { getPaymentGatewayByRegion, clearGatewayCache } from "../../../../modules/payment-gateway"

interface PreferenceRequestBody {
  cartId: string
}

export async function POST(
  req: MedusaRequest<PreferenceRequestBody>,
  res: MedusaResponse
): Promise<void> {
  clearGatewayCache()
  
  try {
    const { cartId } = req.body as PreferenceRequestBody

    if (!cartId) {
      res.status(400).json({ error: "cartId is required" })
      return
    }

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
      res.status(404).json({ error: "Cart not found" })
      return
    }

    if (!cart.currency_code) {
      res.status(400).json({ 
        error: "Cart does not have a currency configured. Please ensure the cart has a valid region." 
      })
      return
    }

    const countryCode = (cart.shipping_address?.country_code || "br").toLowerCase()

    let gateway
    try {
      gateway = await getPaymentGatewayByRegion(countryCode)
    } catch (error: any) {
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

    const result = await gateway.createPreference(preferenceInput)

    res.json({
      preferenceId: result.preferenceId,
      initPoint: result.initPoint,
      sandboxInitPoint: result.sandboxInitPoint,
    })
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create payment preference",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
  }
}
