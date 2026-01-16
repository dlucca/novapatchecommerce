import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pago Rechazado",
  description: "Tu pago no pudo ser procesado",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cartId?: string; payment_id?: string }>
}

export default async function PaymentFailurePage({ params }: Props) {
  const { countryCode } = await params

  return (
    <div className="min-h-screen bg-novapatch-bg-cream py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Error Icon & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-[#0A4C6D] text-3xl font-semibold mb-2">
            Pago Rechazado
          </h1>
          <p className="text-gray-600 text-lg">
            No pudimos procesar tu pago
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-500 text-sm">!</span>
            </div>
            <div>
              <h2 className="text-[#0A4C6D] font-medium mb-1">
                ¿Qué pudo haber pasado?
              </h2>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Fondos insuficientes en tu tarjeta</li>
                <li>• Datos de la tarjeta incorrectos</li>
                <li>• Tu banco rechazó la transacción</li>
                <li>• Límite de compra excedido</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 text-sm">
              Te sugerimos verificar los datos de tu tarjeta o intentar con otro método de pago.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/${countryCode}/checkout?step=payment`}
            className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 px-6 rounded-full text-center transition-colors"
          >
            Intentar de Nuevo
          </Link>
          <Link
            href={`/${countryCode}/cart`}
            className="w-full bg-white border border-gray-300 text-gray-700 text-base font-medium py-3 px-6 rounded-full text-center hover:bg-gray-50 transition-colors"
          >
            Volver al Carrito
          </Link>
        </div>

        {/* Help Link */}
        <div className="text-center mt-6">
          <Link
            href={`/${countryCode}/contact`}
            className="text-[#22b2bd] hover:underline text-sm"
          >
            ¿Necesitas ayuda? Contáctanos
          </Link>
        </div>
      </div>
    </div>
  )
}
