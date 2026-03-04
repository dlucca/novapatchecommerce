import { Container, Heading, Text } from "@medusajs/ui"

import { getPaymentTitleKey, isStripe, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { useLocale, useTranslations } from "next-intl"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const tOrder = useTranslations("order")
  const tPaymentMethods = useTranslations("paymentMethods")
  const locale = useLocale()
  const dateLocale = locale === "pt" ? "pt-BR" : "es-MX"
  const payment = order.payment_collections?.[0]?.payments?.[0]
  const paymentTitleKey = payment ? getPaymentTitleKey(payment.provider_id, locale) : undefined

  const formatPaymentDate = (dateInput: string | Date) => {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
    return date.toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Heading level="h2" className="text-[#0A4C6D] text-xl font-semibold">
          {tOrder("payment.title")}
        </Heading>
        <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
      </div>

      {payment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              {tOrder("payment.method")}
            </Text>
            <div className="flex items-center gap-3">
              <Container className="flex items-center h-10 w-fit p-2 bg-gray-50 rounded-lg border border-gray-100">
                {paymentInfoMap[payment.provider_id]?.icon}
              </Container>
              <Text
                className="text-[#0A4C6D] font-medium text-base"
                data-testid="payment-method"
              >
                {paymentTitleKey
                  ? tPaymentMethods(paymentTitleKey)
                  : tOrder("payment.cardLabel")}
              </Text>
            </div>
          </div>

          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              {tOrder("payment.details")}
            </Text>
            <Text
              className="text-gray-700 text-base"
              data-testid="payment-amount"
            >
              {isStripe(payment.provider_id) && payment.data?.card_last4
                ? tOrder("payment.cardEnding", { last4: String(payment.data.card_last4) })
                : `${convertToLocale({
                    amount: payment.amount,
                    currency_code: order.currency_code,
                  })}`}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              {tOrder("payment.paidAt", { date: formatPaymentDate(payment.created_at ?? "") })}
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
