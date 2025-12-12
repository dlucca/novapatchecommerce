import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/pages/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@/components/ui/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const hasSubscriptionItems = cart?.items?.some((item: any) => item.metadata?.is_subscription)

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          In your Cart
        </Heading>
        <Divider className="my-6" />

        {/* Mensaje especial si hay suscripciones */}
        {hasSubscriptionItems && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-semibold text-blue-900">Suscripción Incluida</p>
                <p className="text-sm text-blue-700 mt-1">
                  Tu suscripción se activará después de completar este pedido.
                  Recibirás envíos automáticos según el plan seleccionado.
                </p>
              </div>
            </div>
          </div>
        )}

        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
