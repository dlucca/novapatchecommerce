import * as crypto from "crypto"
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

// Openpay SDK types (will be properly typed after npm install)
type OpenpayClient = any

export class OpenpayProvider implements ISubscriptionGateway {
    readonly provider: PaymentProvider = "openpay"
    private config: PaymentGatewayConfig | null = null
    private client: OpenpayClient | null = null

    initialize(config: PaymentGatewayConfig): void {
        this.config = config

        if (!config.merchantId || !config.privateKey) {
            throw new Error("Openpay requires merchantId and privateKey in config")
        }

        try {
            // Dynamic import of Openpay SDK
            const Openpay = require("openpay")

            // Openpay SDK initialization: new Openpay(merchantId, privateKey, isProduction)
            this.client = new Openpay(
                config.merchantId,
                config.privateKey,
                !config.sandbox // false = sandbox, true = production
            )
        } catch (error: any) {
            console.error("Failed to initialize Openpay SDK:", error)
            throw new Error(`Openpay SDK initialization failed: ${error.message}`)
        }
    }

    isConfigured(): boolean {
        return !!(this.config?.merchantId && this.config?.privateKey && this.client)
    }

    private ensureConfigured(): void {
        if (!this.isConfigured()) {
            throw new Error("Openpay provider is not configured")
        }
    }

    async createPreference(input: CreatePreferenceInput): Promise<PreferenceResult> {
        this.ensureConfigured()

        if (!input.items || input.items.length === 0) {
            throw new Error("No items provided for Openpay checkout")
        }

        // Calculate total amount from items
        // Medusa prices come in the smallest currency unit (centavos for MXN)
        // But they're already stored as the actual price value (e.g., 500 = $500 MXN, not 5 pesos)
        const totalAmount = input.items.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantity)
        }, 0)

        if (totalAmount <= 0) {
            throw new Error(`Invalid total amount: ${totalAmount}. Amount must be greater than 0`)
        }

        // Prepare checkout data for Openpay
        // By default, Openpay checkouts show ALL available payment methods
        // Add timestamp to order_id to make it unique (Openpay doesn't allow duplicate order_ids)
        const uniqueOrderId = `${input.externalReference}-${Date.now()}`
        
        const checkoutData = {
            amount: totalAmount,
            description: input.items.map((item) => item.title).join(", ").substring(0, 250), // Limit description length
            order_id: uniqueOrderId,
            currency: "MXN",
            redirect_url: input.backUrls.success,
            customer: {
                name: input.payer.firstName || "Cliente",
                last_name: input.payer.lastName || "Novapatch",
                email: input.payer.email,
            },
        }

        // Use Openpay REST API directly since Node SDK doesn't support checkouts
        const baseUrl = this.config!.sandbox 
            ? "https://sandbox-api.openpay.mx/v1" 
            : "https://api.openpay.mx/v1"
        
        const url = `${baseUrl}/${this.config!.merchantId}/checkouts`
        
        // Basic auth with private key
        const auth = Buffer.from(`${this.config!.privateKey}:`).toString('base64')

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`,
                },
                body: JSON.stringify(checkoutData),
            })

            const responseText = await response.text()

            if (!response.ok) {
                let errorMessage = `Openpay API error: ${response.status}`
                try {
                    const errorData = JSON.parse(responseText)
                    errorMessage = errorData.description || errorData.message || errorMessage
                } catch (e) {
                    errorMessage = responseText || errorMessage
                }
                throw new Error(errorMessage)
            }

            const body = JSON.parse(responseText)

            const paymentUrl = body.checkout_link
            if (!paymentUrl) {
                throw new Error("Openpay did not return a checkout link")
            }

            return {
                preferenceId: body.id,
                initPoint: paymentUrl,
                sandboxInitPoint: this.config?.sandbox ? paymentUrl : undefined,
            }
        } catch (error: any) {
            throw new Error(`Openpay checkout error: ${error.message}`)
        }
    }

    async getPayment(paymentId: string): Promise<PaymentInfo> {
        this.ensureConfigured()

        return new Promise((resolve, reject) => {
            this.client!.charges.get(paymentId, (error: any, body: any) => {
                if (error) {
                    reject(new Error(`Openpay get payment error: ${error.description || error.message}`))
                    return
                }

                resolve(this.mapPaymentInfo(body))
            })
        })
    }

    async getPaymentByReference(externalReference: string): Promise<PaymentInfo | null> {
        this.ensureConfigured()

        // Openpay doesn't have a direct search by order_id in charges
        // This would require implementing a search or storing the mapping
        // For now, returning null as a placeholder
        return null
    }

    private mapPaymentInfo(openpayCharge: any): PaymentInfo {
        return {
            id: openpayCharge.id || "",
            status: this.mapPaymentStatus(openpayCharge.status),
            statusDetail: openpayCharge.error_message,
            externalReference: openpayCharge.order_id,
            amount: openpayCharge.amount || 0,
            currencyId: openpayCharge.currency || "MXN",
            paymentMethodId: openpayCharge.payment_method?.type,
            paymentTypeId: openpayCharge.method,
            metadata: openpayCharge.metadata,
        }
    }

    private mapPaymentStatus(openpayStatus: string): PaymentStatus {
        const statusMap: Record<string, PaymentStatus> = {
            charge_pending: "pending",
            in_progress: "in_process",
            completed: "approved",
            cancelled: "cancelled",
            failed: "rejected",
            refunded: "refunded",
        }
        return statusMap[openpayStatus] || "pending"
    }

    validateWebhookSignature(signature: string | undefined, requestId: string | undefined, dataId: string): boolean {
        const webhookSecret = this.config?.webhookSecret

        if (!signature || !webhookSecret) {
            // Allow webhooks in development without secret for testing
            if (process.env.NODE_ENV === "development" && !webhookSecret) {
                return true
            }
            return false
        }

        // Openpay webhook signature validation
        // Note: Openpay uses a different signature mechanism than MercadoPago
        // The exact implementation depends on Openpay's webhook documentation
        // This is a placeholder that should be updated based on official docs

        try {
            // Basic HMAC-SHA256 validation (adjust based on Openpay's actual implementation)
            const expectedSignature = crypto
                .createHmac("sha256", webhookSecret)
                .update(dataId)
                .digest("hex")

            return crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(expectedSignature)
            )
        } catch (error) {
            return false
        }
    }

    async processWebhook(payload: WebhookPayload): Promise<WebhookResult> {
        const { type, data, headers } = payload
        const isValid = this.validateWebhookSignature(headers.signature, headers.requestId, data.id)

        if (!isValid) {
            return { valid: false, type: "unknown", error: "Invalid signature" }
        }

        // Process different webhook types
        if (type.startsWith("charge.")) {
            try {
                const paymentInfo = await this.getPayment(data.id)
                return { valid: true, type: "payment", paymentInfo }
            } catch (error: any) {
                return { valid: true, type: "payment", error: error.message }
            }
        }

        return { valid: true, type: "unknown" }
    }

    async createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionResult> {
        throw new Error("Subscriptions not implemented for Openpay")
    }

    async getSubscription(subscriptionId: string): Promise<SubscriptionInfo> {
        throw new Error("Not implemented")
    }

    async getSubscriptionByReference(externalReference: string): Promise<SubscriptionInfo | null> {
        return null
    }

    async updateSubscriptionStatus(subscriptionId: string, status: SubscriptionStatus): Promise<SubscriptionInfo> {
        throw new Error("Not implemented")
    }

    async cancelSubscription(subscriptionId: string): Promise<void> {
        throw new Error("Not implemented")
    }

    async pauseSubscription(subscriptionId: string): Promise<void> {
        throw new Error("Not implemented")
    }

    async resumeSubscription(subscriptionId: string): Promise<void> {
        throw new Error("Not implemented")
    }

    async searchSubscriptions(params: any): Promise<SubscriptionInfo[]> {
        return []
    }
}
