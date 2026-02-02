import type { Region, RegionProviderConfig, PaymentProvider } from "../types"

export const REGION_PROVIDER_MAP: Record<Region, RegionProviderConfig> = {
  br: { region: "br", provider: "mercadopago", enabled: true },
  mx: { region: "mx", provider: "openpay", enabled: true },
}

export function getProviderByRegion(region: string): PaymentProvider {
  const normalizedRegion = region.toLowerCase()
  const config = REGION_PROVIDER_MAP[normalizedRegion as Region]

  if (!config) {
    throw new Error(`Unknown region: ${region}. Supported regions: ${Object.keys(REGION_PROVIDER_MAP).join(", ")}`)
  }

  if (!config.enabled) {
    throw new Error(`Payment provider not configured for region: ${region}. Please contact support.`)
  }

  if (!config.provider) {
    throw new Error(`No payment provider assigned for region: ${region}`)
  }

  return config.provider
}

export function isRegionSupported(region: string): boolean {
  const normalizedRegion = region.toLowerCase()
  const config = REGION_PROVIDER_MAP[normalizedRegion as Region]
  return !!(config && config.enabled && config.provider)
}

export function getSupportedRegions(): Region[] {
  return Object.entries(REGION_PROVIDER_MAP)
    .filter(([_, config]) => config.enabled && config.provider)
    .map(([region]) => region as Region)
}
