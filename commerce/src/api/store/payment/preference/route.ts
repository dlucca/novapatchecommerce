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
        "items.tax_total",
        "items.subtotal",
        "items.total",
        "items.discount_total",
        "shipping_address.*",
        "shipping_methods.*",
        "shipping_methods.amount",
        "promotions.*",
        "promotions.code"
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

    // Usar precios base sin descuentos aplicados
    const items = cart.items.map((item: any) => ({
      id: item.id,
      title: item.variant?.product?.title || item.title || "Product",
      description: item.variant?.product?.description,
      quantity: item.quantity,
      // Usar subtotal (sin descuentos) o unit_price
      unitPrice: Number(item.subtotal ? item.subtotal / item.quantity : item.unit_price || 0),
      currencyId: cart.currency_code.toUpperCase(),
    }))

    // Agregar envío si existe
    const shippingMethod = cart.shipping_methods?.[0] as
      | {
          amount?: number
          tax_total?: number
          tax_amount?: number
          tax_lines?: Array<{ amount?: number }>
        }
      | undefined
    const shippingAmount = Number(shippingMethod?.amount ?? 0)
    const shippingTaxFromLines = Array.isArray(shippingMethod?.tax_lines)
      ? shippingMethod.tax_lines.reduce((sum, line) => sum + Number(line?.amount ?? 0), 0)
      : 0
    const shippingTaxTotal = Number(
      shippingMethod?.tax_total ?? shippingMethod?.tax_amount ?? shippingTaxFromLines
    )
    const shippingTotal = shippingAmount + shippingTaxTotal
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

    const totalDiscount = cart.items.reduce((sum: number, item: any) => {
      return sum + (item.discount_total || 0)
    }, 0)
    
    if (totalDiscount > 0) {
      items.push({
        id: "discount",
        title: cart.promotions?.[0]?.code ? `Descuento (${cart.promotions[0].code})` : "Descuento",
        description: "Descuento aplicado",
        quantity: 1,
        unitPrice: -Number(totalDiscount), 
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
