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
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-[#22b2bd] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-[#0A4C6D] text-xl font-semibold mb-2">¡Pedido Creado!</h2>
        <p className="text-gray-600">Redirigiendo a tu confirmación...</p>
        <div className="flex items-center justify-center gap-2 mt-4 text-[#22b2bd]">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-[#0A4C6D] text-xl font-semibold mb-2">Procesando tu Pedido</h2>
        <p className="text-gray-600 mb-4">{error}</p>

        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm mb-6 border border-gray-100">
          <p className="text-gray-600"><span className="font-medium text-[#0A4C6D]">Cart ID:</span> <span className="font-mono text-xs">{cartId}</span></p>
          {paymentId && <p className="text-gray-600 mt-1"><span className="font-medium text-[#0A4C6D]">Payment ID:</span> <span className="font-mono text-xs">{paymentId}</span></p>}
        </div>

        <a
          href="mailto:support@novapatch.com"
          className="inline-block bg-[#22b2bd] hover:bg-[#1a9aa5] text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Contactar Soporte
        </a>
      </div>
    )
  }

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-[#22b2bd]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-[#22b2bd] animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 className="text-[#0A4C6D] text-xl font-semibold mb-2">Procesando tu Pedido</h2>
      <p className="text-gray-600 mb-4">
        Estamos verificando tu pago y creando tu pedido...
      </p>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
        <div
          className="bg-[#22b2bd] h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(((attempts + 1) / maxAttempts) * 100, 100)}%` }}
        />
      </div>
      <p className="text-sm text-gray-400">
        Verificando... ({attempts + 1}/{maxAttempts})
      </p>
    </div>
  )
}

