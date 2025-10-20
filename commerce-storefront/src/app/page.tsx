import { redirect } from 'next/navigation'
import { detectUserCountry } from '@lib/util/detect-country-server'

export default async function RootPage() {
  try {
    const countryCode = await detectUserCountry()
    redirect(`/${countryCode}`)
  } catch (error) {
    redirect('/mx')
  }
}
