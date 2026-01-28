import type { IPaymentGateway, ISubscriptionGateway } from "../interfaces"
import type { PaymentProvider, PaymentGatewayConfig } from "../types"
import { getProviderByRegion } from "../config/region-config"
import { MercadoPagoProvider } from "../providers/mercadopago/mercadopago.provider"
import { OpenpayProvider } from "../providers/openpay/openpay.provider"

const providerRegistry: Map<PaymentProvider, () => Promise<new () => IPaymentGateway>> = new Map()
const instanceCache: Map<string, IPaymentGateway> = new Map()

export function registerProvider(
  provider: PaymentProvider,
  loader: () => Promise<new () => IPaymentGateway>
): void {
  providerRegistry.set(provider, loader)
}

export async function getPaymentGateway(config: PaymentGatewayConfig): Promise<IPaymentGateway> {
  const { provider } = config
  const cacheKey = provider

  if (instanceCache.has(cacheKey)) {
    return instanceCache.get(cacheKey)!
  }

  const loader = providerRegistry.get(provider)
  if (!loader) {
    throw new Error(`Payment provider "${provider}" is not registered`)
  }

  const ProviderClass = await loader()
  const instance = new ProviderClass()
  instance.initialize(config)
  instanceCache.set(cacheKey, instance)

  return instance
}

export async function getPaymentGatewayByRegion(region: string): Promise<IPaymentGateway> {
  const provider = getProviderByRegion(region)
  const config = getConfigByRegion(region, provider)
  const cacheKey = `${region.toLowerCase()}-${provider}`

  if (instanceCache.has(cacheKey)) {
    return instanceCache.get(cacheKey)!
  }

  const loader = providerRegistry.get(provider)
  if (!loader) {
    throw new Error(`Payment provider "${provider}" is not registered`)
  }

  const ProviderClass = await loader()
  const instance = new ProviderClass()
  instance.initialize(config)
  instanceCache.set(cacheKey, instance)

  return instance
}

export async function getSubscriptionGateway(config: PaymentGatewayConfig): Promise<ISubscriptionGateway> {
  const gateway = await getPaymentGateway(config)

  if (!isSubscriptionGateway(gateway)) {
    throw new Error(`Payment provider "${config.provider}" does not support subscriptions`)
  }

  return gateway
}

function isSubscriptionGateway(gateway: IPaymentGateway): gateway is ISubscriptionGateway {
  return "createSubscription" in gateway && typeof (gateway as ISubscriptionGateway).createSubscription === "function"
}

export function clearGatewayCache(): void {
  instanceCache.clear()
}

function getConfigByRegion(region: string, provider: PaymentProvider): PaymentGatewayConfig {
  const regionSuffix = region.toUpperCase()
  const providerPrefix = provider.toUpperCase()

  const accessToken = 
    process.env[`${providerPrefix}_${regionSuffix}_ACCESS_TOKEN`] ||
    process.env[`${providerPrefix}_ACCESS_TOKEN`] ||
    ""

  const publicKey = 
    process.env[`${providerPrefix}_${regionSuffix}_PUBLIC_KEY`] ||
    process.env[`${providerPrefix}_PUBLIC_KEY`]

  const webhookSecret = 
    process.env[`${providerPrefix}_${regionSuffix}_WEBHOOK_SECRET`] ||
    process.env[`${providerPrefix}_WEBHOOK_SECRET`]

  const sandbox = 
    process.env[`${providerPrefix}_${regionSuffix}_SANDBOX`] === "true" ||
    process.env[`${providerPrefix}_SANDBOX`] === "true"

  // Openpay-specific fields
  const merchantId = 
    process.env[`${providerPrefix}_${regionSuffix}_MERCHANT_ID`] ||
    process.env[`${providerPrefix}_MERCHANT_ID`]

  const privateKey = 
    process.env[`${providerPrefix}_${regionSuffix}_PRIVATE_KEY`] ||
    process.env[`${providerPrefix}_PRIVATE_KEY`]

  return {
    provider,
    accessToken,
    publicKey,
    webhookSecret,
    sandbox,
    merchantId,
    privateKey,
  }
}

export function getDefaultConfig(): PaymentGatewayConfig {
  return {
    provider: "mercadopago",
    accessToken: process.env.MERCADOPAGO_BR_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN || "",
    publicKey: process.env.MERCADOPAGO_BR_PUBLIC_KEY || process.env.MERCADOPAGO_PUBLIC_KEY,
    webhookSecret: process.env.MERCADOPAGO_BR_WEBHOOK_SECRET || process.env.MERCADOPAGO_WEBHOOK_SECRET,
    sandbox: process.env.MERCADOPAGO_BR_SANDBOX === "true" || process.env.MERCADOPAGO_SANDBOX === "true",
  }
}

registerProvider("mercadopago", async () => {
  return MercadoPagoProvider
})

registerProvider("openpay", async () => {
  return OpenpayProvider
})
