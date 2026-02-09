import { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { getLocaleFromCountryCode } from "@/i18n"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pago Rechazado",
  description: "Tu pago no pudo ser procesado",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cartId?: string; payment_id?: string }>
}

export default async function PaymentFailurePage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { cartId, payment_id } = await searchParams
  const locale = getLocaleFromCountryCode(countryCode)
  const t = await getTranslations({ locale, namespace: "checkout" })

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
            {t("failure.title")}
          </h1>
          <p className="text-gray-600 text-lg">
            {t("failure.subtitle")}
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
                {t("failure.whatHappenedTitle")}
              </h2>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• {t("failure.reason1")}</li>
                <li>• {t("failure.reason2")}</li>
                <li>• {t("failure.reason3")}</li>
                <li>• {t("failure.reason4")}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 text-sm">
              {t("failure.suggestion")}
            </p>
	            {(cartId || payment_id) && (
	              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600">
	                {cartId && (
	                  <p>
	                    <span className="font-medium text-[#0A4C6D]">{t("failure.cartIdLabel")}</span>{" "}
	                    <span className="font-mono">{cartId}</span>
	                  </p>
	                )}
	                {payment_id && (
	                  <p className="mt-1">
	                    <span className="font-medium text-[#0A4C6D]">{t("failure.paymentIdLabel")}</span>{" "}
	                    <span className="font-mono">{payment_id}</span>
	                  </p>
	                )}
	              </div>
	            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/${countryCode}/checkout?step=payment`}
            className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 px-6 rounded-full text-center transition-colors"
          >
            {t("failure.retry")}
          </Link>
          <Link
            href={`/${countryCode}/cart`}
            className="w-full bg-white border border-gray-300 text-gray-700 text-base font-medium py-3 px-6 rounded-full text-center hover:bg-gray-50 transition-colors"
          >
            {t("failure.backToCart")}
          </Link>
        </div>

        {/* Help Link */}
        <div className="text-center mt-6">
          <Link
            href={`/${countryCode}/contact`}
            className="text-[#22b2bd] hover:underline text-sm"
          >
            {t("failure.needHelp")}
          </Link>
        </div>
      </div>
    </div>
  )
}
