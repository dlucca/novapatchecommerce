import { getRequestConfig } from "next-intl/server"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

const countryToLocale: Record<string, string> = {
  mx: "es",
  br: "pt",
}

export const locales = ["es", "pt"] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
  const headersList = await headers()
  const locale = headersList.get("x-next-intl-locale") || "es"

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

export function getLocaleFromCountryCode(countryCode: string): Locale {
  return (countryToLocale[countryCode.toLowerCase()] || "es") as Locale
}

export function getCountryCodeFromLocale(locale: Locale): string {
  const localeToCountry: Record<Locale, string> = {
    es: "mx",
    pt: "br",
  }
  return localeToCountry[locale] || "mx"
}
