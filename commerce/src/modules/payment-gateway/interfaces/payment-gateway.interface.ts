import type {
  PaymentProvider,
  CreatePreferenceInput,
  PreferenceResult,
  PaymentInfo,
  WebhookPayload,
  WebhookResult,
  PaymentGatewayConfig,
} from "../types"

export interface IPaymentGateway {
  readonly provider: PaymentProvider
  initialize(config: PaymentGatewayConfig): void
  isConfigured(): boolean
  createPreference(input: CreatePreferenceInput): Promise<PreferenceResult>
  getPayment(paymentId: string): Promise<PaymentInfo>
  getPaymentByReference(externalReference: string): Promise<PaymentInfo | null>
  validateWebhookSignature(
    signature: string | undefined,
    requestId: string | undefined,
    dataId: string
  ): boolean
  processWebhook(payload: WebhookPayload): Promise<WebhookResult>
}

