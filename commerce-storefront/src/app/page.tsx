import { redirect } from 'next/navigation'
import { detectUserCountry } from '@lib/util/detect-country-server'

export default async function RootPage() {
  const countryCode = await detectUserCountry()

  redirect(`/${countryCode}`)
}
