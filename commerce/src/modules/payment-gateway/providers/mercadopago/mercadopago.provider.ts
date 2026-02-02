import { MercadoPagoConfig, Preference, Payment } from "mercadopago"
import crypto from "crypto"
import type { ISubscriptionGateway } from "../../interfaces"
import type {
  PaymentProvider,
  PaymentGatewayConfig,
  CreatePreferenceInput,
  PreferenceResult,
  PaymentInfo,
  PaymentStatus,
  WebhookPayload,
  WebhookResult,
  CreateSubscriptionInput,
  SubscriptionResult,
  SubscriptionInfo,
  SubscriptionStatus,
} from "../../types"

export class MercadoPagoProvider implements ISubscriptionGateway {
  readonly provider: PaymentProvider = "mercadopago"
  private config: PaymentGatewayConfig | null = null
  private client: MercadoPagoConfig | null = null

  initialize(config: PaymentGatewayConfig): void {
    this.config = config
    this.client = new MercadoPagoConfig({
      accessToken: config.accessToken,
      options: { timeout: 10000 },
    })
  }

  isConfigured(): boolean {
    return !!(this.config?.accessToken && this.client)
  }

  private ensureConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error("MercadoPago provider is not configured")
    }
  }

  async createPreference(input: CreatePreferenceInput): Promise<PreferenceResult> {
    this.ensureConfigured()
    const preference = new Preference(this.client!)

    const items = input.items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description?.substring(0, 255) || "",
      quantity: item.quantity,
      unit_price: item.unitPrice,
      currency_id: item.currencyId,
    }))

    const preferenceData: any = {
      items,
      payer: {
        email: input.payer.email,
        name: input.payer.firstName || "",
        surname: input.payer.lastName || "",
        address: input.payer.address
          ? {
              street_name: input.payer.address.streetName || "",
              street_number: input.payer.address.streetNumber || "",
              zip_code: input.payer.address.zipCode || "",
            }
          : undefined,
      },
      external_reference: input.externalReference,
      metadata: input.metadata || {},
      back_urls: {
        success: input.backUrls.success,
        failure: input.backUrls.failure,
        pending: input.backUrls.pending,
      },
    }

    if (input.autoReturn) {
      preferenceData.auto_return = input.autoReturn
    }

    const response = await preference.create({ body: preferenceData })

    return {
      preferenceId: response.id!,
      initPoint: response.init_point!,
      sandboxInitPoint: response.sandbox_init_point,
    }
  }

  async getPayment(paymentId: string): Promise<PaymentInfo> {
    this.ensureConfigured()
    const paymentApi = new Payment(this.client!)
    const payment = await paymentApi.get({ id: paymentId })
    return this.mapPaymentInfo(payment)
  }

  async getPaymentByReference(_externalReference: string): Promise<PaymentInfo | null> {
    this.ensureConfigured()
    return null
  }

  private mapPaymentInfo(payment: any): PaymentInfo {
    return {
      id: payment.id?.toString() || "",
      status: this.mapPaymentStatus(payment.status),
      statusDetail: payment.status_detail,
      externalReference: payment.external_reference,
      amount: payment.transaction_amount || 0,
      currencyId: payment.currency_id || "BRL",
      paymentMethodId: payment.payment_method_id,
      paymentTypeId: payment.payment_type_id,
      metadata: payment.metadata,
    }
  }

  private mapPaymentStatus(mpStatus: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      pending: "pending",
      approved: "approved",
      authorized: "authorized",
      in_process: "in_process",
      rejected: "rejected",
      cancelled: "cancelled",
      refunded: "refunded",
    }
    return statusMap[mpStatus] || "pending"
  }

  validateWebhookSignature(signature: string | undefined, requestId: string | undefined, dataId: string): boolean {
    const webhookSecret = this.config?.webhookSecret

    if (!signature || !requestId || !webhookSecret) {
      if (process.env.NODE_ENV === "development" && !webhookSecret) {
        return true
      }
      return false
    }

    const parts = signature.split(",")
    const tsMatch = parts.find((p) => p.startsWith("ts="))
    const v1Match = parts.find((p) => p.startsWith("v1="))

    if (!tsMatch || !v1Match) return false

    const ts = tsMatch.replace("ts=", "")
    const receivedHash = v1Match.replace("v1=", "")
    const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`
    const expectedHash = crypto.createHmac("sha256", webhookSecret).update(manifest).digest("hex")

    return crypto.timingSafeEqual(Buffer.from(receivedHash), Buffer.from(expectedHash))
  }

  async processWebhook(payload: WebhookPayload): Promise<WebhookResult> {
    const { type, data, headers } = payload
    const isValid = this.validateWebhookSignature(headers.signature, headers.requestId, data.id)

    if (!isValid) {
      return { valid: false, type: "unknown", error: "Invalid signature" }
    }

    if (type === "payment") {
      try {
        const paymentInfo = await this.getPayment(data.id)
        return { valid: true, type: "payment", paymentInfo }
      } catch (error: any) {
        return { valid: true, type: "payment", error: error.message }
      }
    }

    if (type === "subscription_preapproval" || type === "subscription_authorized_payment") {
      try {
        const subscriptionInfo = await this.getSubscription(data.id)
        return { valid: true, type: "subscription", subscriptionInfo }
      } catch (error: any) {
        return { valid: true, type: "subscription", error: error.message }
      }
    }

    return { valid: true, type: "unknown" }
  }

  async createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionResult> {
    this.ensureConfigured()

    const body = {
      reason: input.reason,
      auto_recurring: {
        frequency: input.autoRecurring.frequency,
        frequency_type: input.autoRecurring.frequencyType,
        transaction_amount: input.autoRecurring.transactionAmount,
        currency_id: input.autoRecurring.currencyId,
        start_date: input.autoRecurring.startDate?.toISOString(),
        end_date: input.autoRecurring.endDate?.toISOString(),
      },
      payer_email: input.payerEmail,
      external_reference: input.externalReference,
      back_url: input.backUrl,
    }

    const response = await fetch("https://api.mercadopago.com/preapproval", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`MP Preapproval error: ${error.message || response.statusText}`)
    }

    const data = await response.json()

    return {
      subscriptionId: data.id,
      status: this.mapSubscriptionStatus(data.status),
      initPoint: data.init_point,
      sandboxInitPoint: data.sandbox_init_point,
    }
  }

  async getSubscription(subscriptionId: string): Promise<SubscriptionInfo> {
    this.ensureConfigured()

    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      headers: { Authorization: `Bearer ${this.config!.accessToken}` },
    })

    if (!response.ok) {
      throw new Error(`Failed to get subscription: ${response.statusText}`)
    }

    const data = await response.json()
    return this.mapSubscriptionInfo(data)
  }

  async getSubscriptionByReference(externalReference: string): Promise<SubscriptionInfo | null> {
    this.ensureConfigured()

    const response = await fetch(
      `https://api.mercadopago.com/preapproval/search?external_reference=${externalReference}`,
      { headers: { Authorization: `Bearer ${this.config!.accessToken}` } }
    )

    if (!response.ok) return null

    const data = await response.json()
    if (data.results?.length > 0) {
      return this.mapSubscriptionInfo(data.results[0])
    }

    return null
  }

  async updateSubscriptionStatus(subscriptionId: string, status: SubscriptionStatus): Promise<SubscriptionInfo> {
    this.ensureConfigured()

    const response = await fetch(`https://api.mercadopago.com/preapproval/${subscriptionId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.config!.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: this.reverseMapSubscriptionStatus(status) }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update subscription: ${response.statusText}`)
    }

    const data = await response.json()
    return this.mapSubscriptionInfo(data)
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.updateSubscriptionStatus(subscriptionId, "cancelled")
  }

  async pauseSubscription(subscriptionId: string): Promise<void> {
    await this.updateSubscriptionStatus(subscriptionId, "paused")
  }

  async resumeSubscription(subscriptionId: string): Promise<void> {
    await this.updateSubscriptionStatus(subscriptionId, "authorized")
  }

  async searchSubscriptions(params: {
    payerEmail?: string
    externalReference?: string
    status?: SubscriptionStatus
  }): Promise<SubscriptionInfo[]> {
    this.ensureConfigured()

    const queryParams = new URLSearchParams()
    if (params.payerEmail) queryParams.set("payer_email", params.payerEmail)
    if (params.externalReference) queryParams.set("external_reference", params.externalReference)
    if (params.status) queryParams.set("status", this.reverseMapSubscriptionStatus(params.status))

    const response = await fetch(`https://api.mercadopago.com/preapproval/search?${queryParams}`, {
      headers: { Authorization: `Bearer ${this.config!.accessToken}` },
    })

    if (!response.ok) return []

    const data = await response.json()
    return (data.results || []).map((r: any) => this.mapSubscriptionInfo(r))
  }

  private mapSubscriptionInfo(data: any): SubscriptionInfo {
    return {
      id: data.id,
      status: this.mapSubscriptionStatus(data.status),
      reason: data.reason,
      payerEmail: data.payer_email,
      autoRecurring: {
        frequency: data.auto_recurring?.frequency || 1,
        frequencyType: data.auto_recurring?.frequency_type || "months",
        transactionAmount: data.auto_recurring?.transaction_amount || 0,
        currencyId: data.auto_recurring?.currency_id || "BRL",
      },
      nextPaymentDate: data.next_payment_date ? new Date(data.next_payment_date) : undefined,
      lastModified: data.last_modified ? new Date(data.last_modified) : undefined,
      externalReference: data.external_reference,
    }
  }

  private mapSubscriptionStatus(mpStatus: string): SubscriptionStatus {
    const statusMap: Record<string, SubscriptionStatus> = {
      pending: "pending",
      authorized: "authorized",
      active: "active",
      paused: "paused",
      cancelled: "cancelled",
    }
    return statusMap[mpStatus] || "pending"
  }

  private reverseMapSubscriptionStatus(status: SubscriptionStatus): string {
    const statusMap: Record<SubscriptionStatus, string> = {
      pending: "pending",
      authorized: "authorized",
      active: "authorized",
      paused: "paused",
      cancelled: "cancelled",
    }
    return statusMap[status]
  }
}
