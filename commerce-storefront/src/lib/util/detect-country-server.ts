import { headers } from 'next/headers'
import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY, isValidCountryCode, type CountryCode } from './region-detection'

export async function detectUserCountry(): Promise<CountryCode> {
  const headersList = await headers()
  
  const cookieCountry = headersList.get('cookie')
    ?.split(';')
    .find(c => c.trim().startsWith('country='))
    ?.split('=')[1]
    ?.trim()
  
  if (cookieCountry && isValidCountryCode(cookieCountry)) {
    return cookieCountry as CountryCode
  }
  
  const cfCountry = headersList.get('cf-ipcountry')?.toUpperCase()
  if (cfCountry && isValidCountryCode(cfCountry)) {
    return cfCountry as CountryCode
  }
  
  const acceptLanguage = headersList.get('accept-language')
  if (acceptLanguage) {
    const country = detectCountryFromLanguage(acceptLanguage)
    if (country) {
      return country
    }
  }
  
  return DEFAULT_COUNTRY
}

function detectCountryFromLanguage(acceptLanguage: string): CountryCode | null {
  const languages = acceptLanguage.toLowerCase().split(',')
  
  for (const lang of languages) {
    // Formato: es-MX, pt-BR, etc.
    const match = lang.match(/([a-z]{2})-([a-z]{2})/)
    if (match) {
      const countryCode = match[2].toUpperCase()
      if (isValidCountryCode(countryCode)) {
        return countryCode as CountryCode
      }
    }
    
    if (lang.includes('pt')) {
      return SUPPORTED_COUNTRIES.BR
    }
    if (lang.includes('es')) {
      return SUPPORTED_COUNTRIES.MX
    }
  }
  
  return null
}

