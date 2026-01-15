import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pago Rechazado",
  description: "Tu pago no pudo ser procesado",
}

export default async function PaymentFailurePage({
  searchParams,
}: {
  searchParams: { cartId?: string; payment_id?: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pago Rechazado
        </h1>
        <p className="text-gray-600 mb-6">
          No pudimos procesar tu pago. Por favor, verifica tus datos e intenta
          nuevamente.
        </p>
        <div className="mt-8 space-x-4">
          <a
            href={`/br/checkout?step=payment`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar de nuevo
          </a>
          <a
            href="/br/cart"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Volver al carrito
          </a>
        </div>
      </div>
    </div>
  )
}
