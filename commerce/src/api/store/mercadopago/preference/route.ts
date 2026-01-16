import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MercadoPagoConfig, Preference } from "mercadopago"

interface PreferenceRequestBody {
  cartId: string
}

export async function POST(
  req: MedusaRequest<PreferenceRequestBody>,
  res: MedusaResponse
): Promise<void> {
  try {
    const { cartId } = req.body as PreferenceRequestBody

    if (!cartId) {
      res.status(400).json({ error: "cartId is required" })
      return
    }

    // Verificar token
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      console.error("MERCADOPAGO_ACCESS_TOKEN not configured")
      res.status(500).json({ error: "Mercado Pago not configured" })
      return
    }

    // Obtener el carrito usando el query API de Medusa v2
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

    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 10000 }
    })
    const preference = new Preference(client)

    const frontendUrl = process.env.STORE_URL || "http://localhost:8000"

    const items = cart.items.map((item: any) => {
      const unitPrice = Number(item.unit_price || 0)
      return {
        id: item.id,
        title: item.variant?.product?.title || item.title || "Product",
        description: item.variant?.product?.description?.substring(0, 255) || "",
        quantity: item.quantity,
        unit_price: unitPrice,
        currency_id: (cart.currency_code || "BRL").toUpperCase(),
      }
    })

    // Get shipping cost if available
    const shippingTotal = cart.shipping_methods?.[0]?.amount || 0

    if (shippingTotal > 0) {
      items.push({
        id: "shipping",
        title: "Envío",
        description: "Costo de envío",
        quantity: 1,
        unit_price: Number(shippingTotal),
        currency_id: (cart.currency_code || "BRL").toUpperCase(),
      })
    }

	    const countryCode = (cart.shipping_address?.country_code || "br").toLowerCase()
	    const successUrl = `${frontendUrl}/${countryCode}/checkout/success?cartId=${cartId}`
	    const failureUrl = `${frontendUrl}/${countryCode}/checkout/failure?cartId=${cartId}`
	    const pendingUrl = `${frontendUrl}/${countryCode}/checkout/pending?cartId=${cartId}`

    const preferenceData: any = {
      items,
      payer: {
        email: cart.email || "customer@example.com",
        name: cart.shipping_address?.first_name || "",
        surname: cart.shipping_address?.last_name || "",
        address: cart.shipping_address ? {
          street_name: cart.shipping_address.address_1 || "",
          street_number: "",
          zip_code: cart.shipping_address.postal_code || "",
        } : undefined,
      },
      external_reference: cartId,
      metadata: {
        cart_id: cartId,
      },
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      ...(frontendUrl.includes('localhost') ? {} : { auto_return: "approved" }),
    }

    const response = await preference.create({ body: preferenceData })

    res.json({
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    })
  } catch (error: any) {
    console.error("Error creating Mercado Pago preference:", error)
    console.error("Error stack:", error.stack)
    res.status(500).json({ 
      error: "Failed to create payment preference",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
  }
}
