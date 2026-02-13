import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-precentage-diff"
import { convertToLocale } from "./money"

type CalculatedPrice = {
  calculated_amount: number
  original_amount: number
  currency_code: string
  calculated_price: {
    price_list_type?: string | null
  }
}

type PricedVariant = HttpTypes.StoreProductVariant & {
  calculated_price?: CalculatedPrice
}

export const getPricesForVariant = (
  variant?: HttpTypes.StoreProductVariant | null
) => {
  const calculatedPrice = (variant as PricedVariant | undefined)?.calculated_price

  if (!calculatedPrice?.calculated_amount) {
    return null
  }

  return {
    calculated_price_number: calculatedPrice.calculated_amount,
    calculated_price: convertToLocale({
      amount: calculatedPrice.calculated_amount,
      currency_code: calculatedPrice.currency_code,
    }),
    original_price_number: calculatedPrice.original_amount,
    original_price: convertToLocale({
      amount: calculatedPrice.original_amount,
      currency_code: calculatedPrice.currency_code,
    }),
    currency_code: calculatedPrice.currency_code,
    price_type: calculatedPrice.calculated_price.price_list_type,
    percentage_diff: getPercentageDiff(
      calculatedPrice.original_amount,
      calculatedPrice.calculated_amount
    ),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const variants = product.variants ?? []
    const pricedVariants = variants.filter(
      (v): v is PricedVariant => Boolean((v as PricedVariant).calculated_price)
    )

    if (pricedVariants.length === 0) {
      return null
    }

    const cheapestVariant = pricedVariants.sort((a, b) => {
      const aAmount = a.calculated_price?.calculated_amount ?? 0
      const bAmount = b.calculated_price?.calculated_amount ?? 0
      return aAmount - bAmount
    })[0]

    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    )

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
