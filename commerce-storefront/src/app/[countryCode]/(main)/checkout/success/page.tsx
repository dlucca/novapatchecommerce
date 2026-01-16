import { Metadata } from "next"
import { redirect } from "next/navigation"
import { verifyAndCompleteOrder } from "@lib/data/mercadopago"
import SuccessPoller from "@modules/checkout/components/success-poller"

export const metadata: Metadata = {
  title: "Pago Exitoso",
  description: "Tu pago ha sido procesado exitosamente",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    cartId?: string
    payment_id?: string
    status?: string
    collection_id?: string
    collection_status?: string
    external_reference?: string
  }>
}

export default async function PaymentSuccessPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const searchParamsData = await searchParams

  const cartId = searchParamsData.cartId || searchParamsData.external_reference
  const payment_id = searchParamsData.payment_id || searchParamsData.collection_id
  const status = searchParamsData.status || searchParamsData.collection_status

  if (!cartId) {
    redirect(`/${countryCode}`)
  }

  if (status === "rejected" || status === "cancelled") {
    redirect(`/${countryCode}/checkout?step=payment&error=payment_${status}`)
  }

  const result = await verifyAndCompleteOrder(cartId, payment_id)

  if (result.success && result.orderId) {
    redirect(`/${countryCode}/order/${result.orderId}/confirmed`)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <SuccessPoller
          cartId={cartId}
          paymentId={payment_id}
          countryCode={countryCode}
          maxAttempts={15}
          intervalMs={2000}
        />
      </div>
    </div>
  )
}
