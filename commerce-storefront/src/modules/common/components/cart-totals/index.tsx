"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

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
      total?: number
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
      const itemTotal = item.total || 0
      const discountAmount = Math.round(itemTotal * (discount / 100))
      return acc + discountAmount
    }
    return acc
  }, 0) || 0

  // Calcular nuevo total con descuento de suscripción
  const totalWithSubscriptionDiscount = (total || 0) - subscriptionDiscount

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span>Subtotal (excl. shipping and taxes)</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        {subscriptionDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>🔄</span>
              <span>Descuento Suscripción</span>
            </span>
            <span
              className="text-ui-fg-interactive font-semibold"
              data-testid="cart-subscription-discount"
              data-value={subscriptionDiscount}
            >
              -{" "}
              {convertToLocale({
                amount: subscriptionDiscount,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={subscriptionDiscount > 0 ? totalWithSubscriptionDiscount : total || 0}
        >
          {convertToLocale({
            amount: subscriptionDiscount > 0 ? totalWithSubscriptionDiscount : total ?? 0,
            currency_code
          })}
        </span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
