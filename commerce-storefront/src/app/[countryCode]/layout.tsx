import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getLocaleFromCountryCode } from '@/i18n'
import { notFound } from 'next/navigation'
import { isValidCountryCode } from '@lib/util/region-detection'

type Props = {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}

export default async function CountryCodeLayout({ children, params }: Props) {
  const { countryCode } = await params
  
  if (!isValidCountryCode(countryCode)) {
    notFound()
  }
  
  const locale = getLocaleFromCountryCode(countryCode)
  
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

