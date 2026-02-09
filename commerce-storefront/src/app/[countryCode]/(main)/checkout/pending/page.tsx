import { Metadata } from "next"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { getLocaleFromCountryCode } from "@/i18n"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pago Pendiente",
  description: "Tu pago está siendo procesado",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ cartId?: string; payment_id?: string }>
}

export default async function PaymentPendingPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { cartId } = await searchParams
  const locale = getLocaleFromCountryCode(countryCode)
  const t = await getTranslations({ locale, namespace: "checkout" })

  return (
    <div className="min-h-screen bg-novapatch-bg-cream py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Pending Icon & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-[#0A4C6D] text-3xl font-semibold mb-2">
            {t("pending.title")}
          </h1>
          <p className="text-gray-600 text-lg">
            {t("pending.subtitle")}
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-[#0A4C6D] font-medium mb-2">
                {t("pending.whatMeansTitle")}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {t("pending.whatMeansDescription")}
              </p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• {t("pending.bullet1")}</li>
                <li>• {t("pending.bullet2")}</li>
                <li>• {t("pending.bullet3")}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center gap-2 text-[#22b2bd]">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium">{t("pending.verifyingPayment")}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
	    <div className="flex flex-col gap-3">
	      {cartId && (
	        <Link
	          href={`/${countryCode}/checkout/success?cartId=${cartId}`}
	          className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 px-6 rounded-full text-center transition-colors"
	        >
	          {t("pending.checkOrderStatus")}
	        </Link>
	      )}
	      <Link
	        href={`/${countryCode}`}
	        className="w-full bg-white border border-gray-300 text-gray-700 text-base font-medium py-3 px-6 rounded-full text-center hover:bg-gray-50 transition-colors"
	      >
	        {t("pending.backToStore")}
	      </Link>
	    </div>

        {/* Help Link */}
        <div className="text-center mt-6">
          <Link
            href={`/${countryCode}/contact`}
            className="text-[#22b2bd] hover:underline text-sm"
          >
            {t("pending.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  )
}
