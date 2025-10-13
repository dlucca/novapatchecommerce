export const SUPPORTED_COUNTRIES = {
  MX: 'mx',
  BR: 'br',
} as const

export type CountryCode = typeof SUPPORTED_COUNTRIES[keyof typeof SUPPORTED_COUNTRIES]

export const DEFAULT_COUNTRY: CountryCode = SUPPORTED_COUNTRIES.MX

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
  return Object.values(SUPPORTED_COUNTRIES)
    .map(code => getCountryInfo(code))
    .filter((country): country is NonNullable<typeof country> => country !== null)
}

