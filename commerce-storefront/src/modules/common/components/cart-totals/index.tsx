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
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
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
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
    items,
  } = totals

  // Calcular descuento de suscripción
  const subscriptionDiscount = items?.reduce((acc, item) => {
    if (item.metadata?.is_subscription && item.metadata?.subscription_discount) {
      const discount = item.metadata.subscription_discount as number
      const originalUnitPrice = item.unit_price || 0
      const discountAmount = Math.round(originalUnitPrice * (discount / 100)) * item.quantity
      return acc + discountAmount
    }
    return acc
  }, 0) || 0

  const t = useTranslations("discount");
  return (
    <div>
      <div className="flex flex-col gap-y-3 text-base text-gray-600">
        <div className="flex items-center justify-between">
          <span>{t("subtotal")}</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("shipping")}</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {subscriptionDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>{t("subscriptionDiscount")}</span>
            </span>
            <span
              className="text-[#22b2bd] font-semibold"
              data-testid="cart-subscription-discount"
              data-value={subscriptionDiscount}
            >
              -{convertToLocale({
                amount: subscriptionDiscount,
                currency_code,
              })}
            </span>
          </div>
        )}
        {!!discount_subtotal && subscriptionDiscount === 0 && (
          <div className="flex items-center justify-between">
            <span>{t("discount")}</span>
            <span
              className="text-[#22b2bd]"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
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
          data-value={(total || 0) - subscriptionDiscount}
        >
          {convertToLocale({
            amount: (total ?? 0) - subscriptionDiscount,
            currency_code
          })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
