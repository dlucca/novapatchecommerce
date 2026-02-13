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
        "items.metadata",
        "shipping_address.*",
        "shipping_methods.*",
        "shipping_methods.amount",
        "promotions.*",
        "promotions.code",
        "+subtotal",
        "+discount_total",
        "+shipping_total",
        "+tax_total",
        "+total"
      ],
      filters: { id: cartId }
    })

    const cart = carts[0] as any

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

    if (!cart.items || cart.items.length === 0) {
      res.status(400).json({
        error: "Cart has no items"
      })
      return
    }

    const countryCode = (cart.shipping_address?.country_code || "br").toLowerCase()

    let gateway: any
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

    // Calculate total amount from items using unit_price and quantity
    // Since computed fields like +total are not being retrieved, we'll use unit_price
    let totalDiscount = 0
    const itemsTotal = (cart.items || []).reduce((sum: number, item: any) => {
      // Try to get unit_price, fallback to variant price if available
      let price = Number(item.unit_price ?? 0)
      if (price === 0 && item.variant?.prices && item.variant.prices.length > 0) {
        // Get the price for the cart's currency
        const variantPrice = item.variant.prices.find((p: any) => p.currency_code === cart.currency_code)
        price = Number(variantPrice?.amount ?? 0)
      }

      // Check if item has subscription discount in metadata
      if (item.metadata?.subscription_discount) {
        const discountPercent = Number(item.metadata.subscription_discount)
        const discountAmount = Math.round(price * (discountPercent / 100)) * Number(item.quantity ?? 0)
        totalDiscount += discountAmount
      }

      const itemTotal = price * Number(item.quantity ?? 0)
      return sum + itemTotal
    }, 0)

    // Get shipping total - try multiple possible field names
    let cartShippingTotal = Number(cart.shipping_total ?? 0)
    if (cartShippingTotal === 0 && cart.shipping_methods && cart.shipping_methods.length > 0) {
      // If shipping_total is not available, try to get it from shipping_methods
      cartShippingTotal = (cart.shipping_methods[0] as any)?.amount ?? 0
    }

    // Calculate final total with discount applied
    let totalAmount = itemsTotal - totalDiscount + cartShippingTotal

    // Log detailed item information for debugging
    console.log("Cart items debug:", cart.items?.map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      total: item.total,
      discount_total: item.discount_total,
      tax_total: item.tax_total,
      metadata: item.metadata,
      calculated_item_total: Number(item.unit_price ?? 0) * Number(item.quantity ?? 0),
    })))

    console.log("Cart promotions debug:", cart.promotions?.map((promo: any) => ({
      id: promo.id,
      code: promo.code,
      type: promo.type,
    })))

    console.log("Cart totals debug:", {
      items_count: cart.items?.length,
      items_total: itemsTotal,
      total_discount: totalDiscount,
      shipping_total: cartShippingTotal,
      cart_total: cart.total,
      cart_subtotal: cart.subtotal,
      cart_discount_total: cart.discount_total,
      cart_tax_total: cart.tax_total,
      calculated_total: totalAmount,
    })

    if (totalAmount <= 0) {
      res.status(400).json({
        error: "Cart total is invalid or zero",
        total: totalAmount,
        debug: {
          items_total: itemsTotal,
          shipping_total: cartShippingTotal,
          cart_total: cart.total,
          cart_subtotal: cart.subtotal,
          cart_discount_total: cart.discount_total,
          cart_tax_total: cart.tax_total,
        }
      })
      return
    }

    // Build items for Openpay display purposes
    // Use unit_price directly since computed fields are not being retrieved
    const items = cart.items.map((item: any) => {
      // Try to get unit_price, fallback to variant price if available
      let unitPrice = Number(item.unit_price || 0)
      if (unitPrice === 0 && item.variant?.prices && item.variant.prices.length > 0) {
        // Get the price for the cart's currency
        const variantPrice = item.variant.prices.find((p: any) => p.currency_code === cart.currency_code)
        unitPrice = Number(variantPrice?.amount ?? 0)
      }

      return {
        id: item.id,
        title: item.variant?.product?.title || item.title || "Product",
        description: item.variant?.product?.description,
        quantity: item.quantity,
        unitPrice,
        currencyId: cart.currency_code.toUpperCase(),
      }
    })

    // Add shipping as a separate line item if it exists
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

    // Calculate the difference between what we're sending and what the total should be
    // This accounts for discounts that are applied at the cart level
    const calculatedTotal = items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.quantity), 0)
    const difference = totalAmount - calculatedTotal

    console.log("Openpay items calculation:", {
      items_count: items.length,
      calculated_total: calculatedTotal,
      target_total: totalAmount,
      difference,
    })

    if (Math.abs(difference) > 0.01) {
      // Add a correction item to ensure the total matches exactly
      // This could be a discount or an adjustment
      items.push({
        id: "adjustment",
        title: difference > 0 ? "Ajuste" : "Descuento",
        description: difference > 0 ? "Ajuste de total" : "Descuento aplicado",
        quantity: 1,
        unitPrice: Number(difference),
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
