import { Heading, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-8 min-h-[calc(100vh-64px)] bg-novapatch-bg-cream">
      <div className="content-container flex flex-col justify-center items-center gap-y-8 max-w-4xl w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        {/* Success Header */}
        <div
          className="flex flex-col items-center text-center gap-y-4 py-8"
          data-testid="order-complete-container"
        >
          <div className="w-16 h-16 bg-[#22b2bd] rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Heading
            level="h1"
            className="text-[#0A4C6D] text-3xl font-semibold"
          >
            ¡Gracias por tu compra!
          </Heading>
          <Text className="text-gray-600 text-lg">
            Tu pedido ha sido procesado exitosamente.
          </Text>
        </div>

        {/* Order Details Card */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <OrderDetails order={order} />
        </div>

        {/* Order Summary Card */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <Heading
            level="h2"
            className="text-[#0A4C6D] text-xl font-semibold mb-5"
          >
            Resumen del Pedido
          </Heading>
          <Items order={order} />
          <div className="mt-6 pt-4 border-t border-gray-100">
            <CartTotals totals={{
              ...order,
              items: (order.items || []).map(item => ({
                metadata: item.metadata as { is_subscription?: boolean; subscription_discount?: number } | undefined,
                unit_price: item.unit_price,
                quantity: item.quantity
              }))
            }} />
          </div>
        </div>

        {/* Shipping Details Card */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <ShippingDetails order={order} />
        </div>

        {/* Payment Details Card */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <PaymentDetails order={order} />
        </div>

        {/* Help Section */}
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <Help />
        </div>

        {/* Continue Shopping Button */}
        <div className="w-full flex justify-center py-4">
          <LocalizedClientLink
            href="/"
            className="bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 px-8 rounded-full transition-colors"
          >
            Continuar Comprando
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
