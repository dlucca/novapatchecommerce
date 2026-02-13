"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { createOpenpayPreference } from "@/lib/data/openpay"

type OpenpayPaymentProps = {
    cart: HttpTypes.StoreCart
    session: HttpTypes.StorePaymentSession
    onPaymentCompleted: () => void
}

/**
 * Openpay Payment Component - Redirect with Checkout Flow
 *
 * This component implements the redirect-based payment flow for Openpay.
 * When the user clicks "Pay", it:
 * 1. Creates a checkout preference on the backend
 * 2. Redirects to Openpay's hosted checkout page
 * 3. User completes payment on Openpay
 * 4. Openpay redirects back with payment result
 */
export default function OpenpayPayment({
    cart,
}: OpenpayPaymentProps) {
    const t = useTranslations("checkout")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePayment = async () => {
        setLoading(true)
        setError(null)

        try {
            // Crear preferencia de pago en Openpay
            const preference = await createOpenpayPreference(cart.id)

            const openpayEnv = process.env.NEXT_PUBLIC_OPENPAY_ENV
            const useSandbox = openpayEnv
                ? openpayEnv !== "production"
                : process.env.NODE_ENV !== "production"

            const redirectUrl = useSandbox
                ? (preference.sandboxInitPoint || preference.initPoint)
                : preference.initPoint

            if (redirectUrl) {
                window.location.href = redirectUrl
            } else {
                throw new Error(t("openpay.errorPreference"))
            }
        } catch (err: any) {
            console.error("Error creating Openpay preference:", err)
            setError(err.message || t("openpay.errorProcess"))
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
                    {error}
                </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div className="flex-1">
                        <h3 className="font-semibold text-blue-900 text-lg mb-2">
                            {t("openpay.selectedTitle")}
                        </h3>
                        <p className="text-blue-800 text-sm mb-3">
                            {t("openpay.intro")}
                        </p>
                        <div className="bg-white p-3 rounded-md border border-blue-100 mb-4">
                            <p className="text-sm text-gray-700 mb-2">
                                <span className="font-semibold">{t("openpay.totalLabel")}</span>{" "}
                                {new Intl.NumberFormat('es-MX', {
                                    style: 'currency',
                                    currency: cart.currency_code || 'MXN'
                                }).format((cart.total || 0) / 100)}
                            </p>
                            <p className="text-xs text-gray-600">
                                {t("openpay.secureConnection")}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-md transition-colors"
                        >
                            {loading ? t("openpay.redirecting") : t("openpay.payButton")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
