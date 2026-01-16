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



  return (
    <div>
      <div className="flex flex-col gap-y-3 text-base text-gray-600">
        <div className="flex items-center justify-between">
          <span>Subtotal (excl. envío e impuestos)</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0} className="text-[#0A4C6D]">
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Envío</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0} className="text-[#0A4C6D]">
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {subscriptionDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[#22b2bd]">
              <span>ⓘ</span>
              <span>Descuento Suscripción</span>
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
            <span>Descuento</span>
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
          <span>Impuestos</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0} className="text-[#0A4C6D]">
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#0A4C6D] font-semibold text-lg">Total</span>
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
