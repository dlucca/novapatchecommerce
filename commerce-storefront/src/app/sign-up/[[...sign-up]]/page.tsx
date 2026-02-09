import { SignUp } from '@clerk/nextjs'
import Image from "next/image"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"
import { getLocaleFromCountryCode } from "@/i18n"
import type { Metadata } from "next"

const getLocaleFromCookie = () => {
  const country = cookies().get("country")?.value
  return country ? getLocaleFromCountryCode(country) : "es"
}

export const metadata: Metadata = {
  title: "Crear Cuenta - NovaPatch",
  description: "Únete a NovaPatch y descubre los parches médicos más innovadores. Crea tu cuenta para acceder a productos exclusivos.",
}

export default async function Page() {
  const locale = getLocaleFromCookie()
  const t = await getTranslations({ locale, namespace: "auth" })
  const tCommon = await getTranslations({ locale, namespace: "common" })
  return (
    <div className="min-h-screen bg-gradient-to-br from-novapatch-bg-light to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/assets/nav/LOGO-1.svg"
              alt={tCommon("brandLogoAlt")}
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
        <div className="w-fit m-auto">

          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-novapatch-button hover:bg-novapatch-footer text-white font-medium transition-colors duration-200 rounded-lg',
                card: 'bg-white shadow-xl border border-gray-200 rounded-lg',
                headerTitle: 'text-novapatch-title font-bold text-xl',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors duration-200',
                formFieldInput: 'border border-gray-300 rounded-lg focus:border-novapatch-button focus:ring-novapatch-button',
                footerActionLink: 'text-novapatch-button hover:text-novapatch-footer',
              },
              variables: {
                colorPrimary: '#4e83bb',
                colorBackground: '#ffffff',
                colorInputBackground: '#ffffff',
                colorInputText: '#374151',
                borderRadius: '0.5rem',
                fontFamily: 'var(--font-outfit), Outfit, -apple-system, BlinkMacSystemFont, sans-serif',
              },
            }}
          />
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {t.rich("signUpAgreement", {
              terms: (chunks) => (
                <a href="/info" className="text-novapatch-button hover:text-novapatch-footer font-medium">
                  {chunks}
                </a>
              ),
              privacy: (chunks) => (
                <a href="/info" className="text-novapatch-button hover:text-novapatch-footer font-medium">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
