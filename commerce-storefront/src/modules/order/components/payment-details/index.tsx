import { Container, Heading, Text } from "@medusajs/ui"

import { isStripe, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  const formatPaymentDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
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
          Pago
        </Heading>
        <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
      </div>

      {payment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              Método de Pago
            </Text>
            <div className="flex items-center gap-3">
              <Container className="flex items-center h-10 w-fit p-2 bg-gray-50 rounded-lg border border-gray-100">
                {paymentInfoMap[payment.provider_id]?.icon}
              </Container>
              <Text
                className="text-[#0A4C6D] font-medium text-base"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id]?.title || 'Tarjeta'}
              </Text>
            </div>
          </div>

          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              Detalles del Pago
            </Text>
            <Text
              className="text-gray-700 text-base"
              data-testid="payment-amount"
            >
              {isStripe(payment.provider_id) && payment.data?.card_last4
                ? `Tarjeta terminada en ${payment.data.card_last4}`
                : `${convertToLocale({
                    amount: payment.amount,
                    currency_code: order.currency_code,
                  })}`}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Pagado el {formatPaymentDate(payment.created_at ?? "")}
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
