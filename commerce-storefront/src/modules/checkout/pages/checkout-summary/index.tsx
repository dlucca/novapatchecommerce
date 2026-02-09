import { Heading } from "@medusajs/ui"
import { useTranslations } from "next-intl"

import ItemsPreviewTemplate from "@modules/cart/pages/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const hasSubscriptionItems = cart?.items?.some((item: any) => item.metadata?.is_subscription)
  const t = useTranslations("checkout")

  return (
    <div className="sticky top-0 flex flex-col gap-y-4 py-8 small:py-0">
      <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col">
        <Heading
          level="h2"
          className="text-[#0A4C6D] text-xl font-semibold mb-5"
        >
          {t("summary.title")}
        </Heading>

        {/* Mensaje especial si hay suscripciones */}
        {hasSubscriptionItems && (
          <div className="mb-5 p-4 bg-[#22b2bd]/10 border border-[#22b2bd]/30 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-[#22b2bd] text-lg">ⓘ</span>
              <div>
                <p className="font-semibold text-[#0A4C6D] text-base">{t("summary.subscriptionIncluded")}</p>
                <p className="text-base text-gray-600 mt-1">
                  {t("summary.subscriptionMessage")}
                </p>
              </div>
            </div>
          </div>
        )}

        <ItemsPreviewTemplate cart={cart} />

        <div className="border-t border-gray-200 mt-5 pt-5">
          <CartTotals totals={cart} />
        </div>

        <div className="mt-5">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
