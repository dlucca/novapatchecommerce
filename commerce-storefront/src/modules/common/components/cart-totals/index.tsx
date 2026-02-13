"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"
import { useTranslations } from "next-intl"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    discount_total?: number | null
    shipping_total?: number | null
    items?: Array<{
      metadata?: {
        is_subscription?: boolean
        subscription_discount?: number
      }
      unit_price?: number
      quantity: number
    }>
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    subtotal,
    shipping_total,
    discount_total,
    items,
  } = totals

  const t = useTranslations("discount");

  // Medusa's subtotal includes shipping, so we need to subtract it to get just the items subtotal
  // subtotal = items_subtotal + shipping_subtotal (before discounts)
  const itemsSubtotalBeforeDiscount = (subtotal ?? 0) - (shipping_total ?? 0)
  const baseSubtotal = itemsSubtotalBeforeDiscount
  const baseTotal =
    total ?? baseSubtotal + (shipping_total ?? 0) + (tax_total ?? 0)

  const itemsSubtotal = (items || []).reduce((acc, item) => {
    const unitPrice = item.unit_price ?? 0
    return acc + unitPrice * item.quantity
  }, 0)

  const subscriptionDiscountTotal = (items || []).reduce((acc, item) => {
    if (!item.metadata?.is_subscription || !item.metadata?.subscription_discount) {
      return acc
    }

    const discount = item.metadata.subscription_discount
    const unitPrice = item.unit_price ?? 0
    const originalLineTotal = unitPrice * item.quantity
    const discountedLineTotal = Math.round(
      originalLineTotal * (1 - discount / 100)
    )

    return acc + Math.max(0, originalLineTotal - discountedLineTotal)
  }, 0)

  // Calculate the original subtotal for items with subscription discounts only
  // This is used to show the crossed-out price
  const subscriptionItemsOriginalSubtotal = (items || []).reduce((acc, item) => {
    if (!item.metadata?.is_subscription || !item.metadata?.subscription_discount) {
      return acc
    }

    const unitPrice = item.unit_price ?? 0
    return acc + unitPrice * item.quantity
  }, 0)

  const shouldApplySubscriptionFallback =
    subscriptionDiscountTotal > 0 &&
    !(discount_total && discount_total > 0) &&
    itemsSubtotal > 0 &&
    Math.abs(itemsSubtotal - baseSubtotal) <= 1

  const effectiveDiscountTotal = shouldApplySubscriptionFallback
    ? subscriptionDiscountTotal
    : discount_total ?? 0

  const effectiveSubtotal = shouldApplySubscriptionFallback
    ? Math.max(0, baseSubtotal - subscriptionDiscountTotal)
    : baseSubtotal

  const effectiveTotal = shouldApplySubscriptionFallback
    ? Math.max(0, baseTotal - subscriptionDiscountTotal)
    : baseTotal

  // When there's a subscription discount, only show the original price of items with discounts
  // Otherwise, show the full subtotal
  const originalSubtotal = shouldApplySubscriptionFallback
    ? subscriptionItemsOriginalSubtotal
    : effectiveSubtotal + effectiveDiscountTotal

  return (
    <div>
      <div className="flex flex-col gap-y-3 text-base text-gray-600">
        {/* Precio original */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t("subtotal")}</span>
          <span
            className="line-through text-gray-400"
            data-testid="cart-original-subtotal"
            data-value={originalSubtotal || 0}
          >
            {convertToLocale({ amount: originalSubtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Descuento */}
        {!!effectiveDiscountTotal && (
          <div className="flex items-center justify-between">
            <span className="text-[#22b2bd] font-medium">{t("discount")}</span>
            <span
              className="text-[#22b2bd] font-medium"
              data-testid="cart-discount"
              data-value={effectiveDiscountTotal || 0}
            >
              -{convertToLocale({
                amount: effectiveDiscountTotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        {/* Subtotal con descuento aplicado */}
        <div className="flex items-center justify-between font-semibold text-gray-900">
          <span>{t("subtotal")} ({t("discount")})</span>
          <span data-testid="cart-subtotal" data-value={effectiveSubtotal || 0}>
            {convertToLocale({ amount: effectiveSubtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Envío */}
        <div className="flex items-center justify-between">
          <span>{t("shipping")}</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </div>

        {/* Impuestos */}
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">{t("taxes")}</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>{t("total")}</span>
        <span
          className="text-[#0A4C6D] font-bold text-xl"
          data-testid="cart-total"
          data-value={effectiveTotal || 0}
        >
          {convertToLocale({
            amount: effectiveTotal ?? 0,
            currency_code
          })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
