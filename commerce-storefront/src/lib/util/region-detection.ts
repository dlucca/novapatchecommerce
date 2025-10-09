import { headers } from 'next/headers'

export const SUPPORTED_COUNTRIES = {
  MX: 'mx',
  BR: 'br',
} as const

export type CountryCode = typeof SUPPORTED_COUNTRIES[keyof typeof SUPPORTED_COUNTRIES]

export const DEFAULT_COUNTRY: CountryCode = SUPPORTED_COUNTRIES.MX

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
  
  const cfCountry = headersList.get('cf-ipcountry')?.toLowerCase()
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
    const match = lang.match(/([a-z]{2})-([a-z]{2})/)
    if (match) {
      const countryCode = match[2]
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

export function isValidCountryCode(code: string): boolean {
  return Object.values(SUPPORTED_COUNTRIES).includes(code as CountryCode)
}

export function getCountryInfo(code: CountryCode) {
  if (!isValidCountryCode(code)) {
    return null
  }
  const countryInfo = {
    [SUPPORTED_COUNTRIES.MX]: {
      code: 'mx',
      name: 'México',
      flag: '🇲🇽',
      language: 'es',
      currency: 'MXN',
      locale: 'es-MX',
    },
    [SUPPORTED_COUNTRIES.BR]: {
      code: 'br',
      name: 'Brasil',
      flag: '🇧🇷',
      language: 'pt',
      currency: 'BRL',
      locale: 'pt-BR',
    },
  }
  
  return countryInfo[code]
}
export function getAllCountries() {
  return Object.values(SUPPORTED_COUNTRIES).map(code => getCountryInfo(code))
}

