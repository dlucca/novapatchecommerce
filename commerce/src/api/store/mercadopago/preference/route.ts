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
        "shipping_address.*"
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
      options: { timeout: 5000 }
    })
    const preference = new Preference(client)

    const frontendUrl = process.env.STORE_URL || "http://localhost:8000"
    
    const items = cart.items.map((item: any) => ({
      id: item.id,
      title: item.variant?.product?.title || item.title || "Product",
      quantity: item.quantity,
      unit_price: Number(((item.unit_price || 0) / 100).toFixed(2)),
      currency_id: (cart.currency_code || "BRL").toUpperCase(),
    }))

    // TODO:
    // Nota: En desarrollo con localhost, las back_urls no son validadas por MP
    // pero son requeridas. En producción usar URLs públicas.
    const preferenceData: any = {
      items,
      payer: {
        email: cart.email || "test@test.com",
      },
      external_reference: cartId,
      metadata: {
        cart_id: cartId,
      },
    }

    // Solo agregar back_urls si es una URL pública (no localhost)
    if (!frontendUrl.includes('localhost')) {
      preferenceData.back_urls = {
        success: `${frontendUrl}/br/checkout/success?cartId=${cartId}`,
        failure: `${frontendUrl}/br/checkout/failure?cartId=${cartId}`,
        pending: `${frontendUrl}/br/checkout/pending?cartId=${cartId}`,
      }
      preferenceData.auto_return = "approved"
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
