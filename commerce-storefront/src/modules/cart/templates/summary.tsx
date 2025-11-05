"use client"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  const transformedCart = {
    ...cart,
    items: (cart.items || []).map(item => ({
      ...item,
      metadata: item.metadata || { is_subscription: false },
      unit_price: item.unit_price ?? 0,
      quantity: item.quantity,
    })),
  }

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Resumen del pedido
      </h2>

      <DiscountCode cart={cart} />

      <Divider />

      <CartTotals totals={transformedCart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <button className="w-full bg-novapatch-primary hover:bg-novapatch-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
          Proceder al pago
        </button>
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store"
        className="text-center text-sm text-gray-600 hover:text-novapatch-primary transition-colors"
      >
        ← Continuar comprando
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
