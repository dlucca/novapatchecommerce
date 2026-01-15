import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pago Exitoso",
  description: "Tu pago ha sido procesado exitosamente",
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { cartId?: string; payment_id?: string; status?: string }
}) {
  // TODO: Aquí deberías verificar el estado del pago y crear la orden
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu pago ha sido procesado correctamente. Recibirás un email de
          confirmación en breve.
        </p>
        <div className="space-y-2">
          {searchParams.payment_id && (
            <p className="text-sm text-gray-500">
              ID de Pago: {searchParams.payment_id}
            </p>
          )}
          {searchParams.status && (
            <p className="text-sm text-gray-500">
              Estado: {searchParams.status}
            </p>
          )}
        </div>
        <div className="mt-8">
          <a
            href="/br"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a la tienda
          </a>
        </div>
      </div>
    </div>
  )
}
