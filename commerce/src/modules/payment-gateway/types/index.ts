export type PaymentProvider = "mercadopago" | "openpay"

export type Region = "br" | "mx"

export interface RegionProviderConfig {
  region: Region
  provider: PaymentProvider | null
  enabled: boolean
}

export type PaymentStatus =
  | "pending"
  | "approved"
  | "authorized"
  | "in_process"
  | "rejected"
  | "cancelled"
  | "refunded"

export type SubscriptionStatus =
  | "pending"
  | "authorized"
  | "active"
  | "paused"
  | "cancelled"

export type FrequencyType = "days" | "months"

export interface PreferenceItem {
  id: string
  title: string
  description?: string
  quantity: number
  unitPrice: number
  currencyId: string
}

export interface PayerInfo {
  email: string
  firstName?: string
  lastName?: string
  address?: {
    streetName?: string
    streetNumber?: string
    zipCode?: string
  }
}

export interface BackUrls {
  success: string
  failure: string
  pending: string
}

export interface CreatePreferenceInput {
  items: PreferenceItem[]
  payer: PayerInfo
  externalReference: string
  backUrls: BackUrls
  metadata?: Record<string, unknown>
  autoReturn?: "approved" | "all"
}

export interface PreferenceResult {
  preferenceId: string
  initPoint: string
  sandboxInitPoint?: string
}

export interface PaymentInfo {
  id: string
  status: PaymentStatus
  statusDetail?: string
  externalReference?: string
  amount: number
  currencyId: string
  paymentMethodId?: string
  paymentTypeId?: string
  metadata?: Record<string, unknown>
}

export interface AutoRecurring {
  frequency: number
  frequencyType: FrequencyType
  transactionAmount: number
  currencyId: string
  startDate?: Date
  endDate?: Date
}

export interface CreateSubscriptionInput {
  reason: string
  autoRecurring: AutoRecurring
  payerEmail: string
  externalReference: string
  backUrl: string
  metadata?: Record<string, unknown>
}

export interface SubscriptionResult {
  subscriptionId: string
  status: SubscriptionStatus
  initPoint: string
  sandboxInitPoint?: string
}

export interface SubscriptionInfo {
  id: string
  status: SubscriptionStatus
  reason: string
  payerEmail: string
  autoRecurring: AutoRecurring
  nextPaymentDate?: Date
  lastModified?: Date
  externalReference?: string
}

export interface WebhookPayload {
  type: string
  action?: string
  data: {
    id: string
  }
  headers: {
    signature?: string
    requestId?: string
  }
}

export interface WebhookResult {
  valid: boolean
  type: "payment" | "subscription" | "unknown"
  paymentInfo?: PaymentInfo
  subscriptionInfo?: SubscriptionInfo
  error?: string
}

export interface PaymentGatewayConfig {
  provider: PaymentProvider
  // MercadoPago authentication
  accessToken?: string
  // Openpay authentication
  merchantId?: string
  privateKey?: string
  // Common fields
  publicKey?: string
  webhookSecret?: string
  sandbox?: boolean
}

