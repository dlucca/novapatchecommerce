"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { verifyAndCompleteOrder } from "@lib/data/mercadopago"

interface SuccessPollerProps {
  cartId: string
  paymentId?: string
  countryCode: string
  maxAttempts?: number
  intervalMs?: number
}

type Status = "checking" | "success" | "processing" | "error"

export default function SuccessPoller({
  cartId,
  paymentId,
  countryCode,
  maxAttempts = 10,
  intervalMs = 3000,
}: SuccessPollerProps) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>("checking")
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  const checkStatus = useCallback(async () => {
    try {
      const result = await verifyAndCompleteOrder(cartId, paymentId)

      if (result.success && result.orderId) {
        setOrderId(result.orderId)
        setStatus("success")
        router.push(`/${countryCode}/order/${result.orderId}/confirmed`)
        return true
      } else if (result.error?.includes("rejected") || result.error?.includes("not approved")) {
        setError(result.error || "Payment failed")
        setStatus("error")
        return true
      } else {
        setStatus("processing")
        return false
      }
    } catch (err: any) {
      console.error("Polling error:", err)
      return false
    }
  }, [cartId, paymentId, countryCode, router])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setStatus("error")
        setError("Order creation is taking longer than expected. Please check your email or contact support.")
        return
      }

      const done = await checkStatus()
      if (!done) {
        setAttempts(prev => prev + 1)
        timeoutId = setTimeout(poll, intervalMs)
      }
    }

    poll()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [attempts, maxAttempts, intervalMs, checkStatus])

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4" />
        <p className="text-green-600">¡Pedido creado! Redirigiendo...</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-yellow-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Procesando tu pedido</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm mb-4">
          <p><strong>Cart ID:</strong> <span className="font-mono">{cartId}</span></p>
          {paymentId && <p><strong>Payment ID:</strong> <span className="font-mono">{paymentId}</span></p>}
        </div>
        <a 
          href="mailto:support@novapatch.com" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Contactar Soporte
        </a>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Procesando tu pedido</h2>
      <p className="text-gray-600">
        Estamos verificando tu pago y creando tu pedido...
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Intento {attempts + 1} de {maxAttempts}
      </p>
    </div>
  )
}

