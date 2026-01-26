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

        console.log("Initializing Openpay provider...")
        console.log("  Merchant ID:", config.merchantId)
        console.log("  Sandbox:", config.sandbox)

        // Dynamic import of Openpay SDK
        const Openpay = require("openpay")

        // Openpay SDK initialization: new Openpay(merchantId, privateKey, isProduction)
        this.client = new Openpay(
            config.merchantId,
            config.privateKey,
            !config.sandbox // false = sandbox, true = production
        )
        
        console.log("Openpay client initialized successfully")
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

        console.log("=== Openpay createPreference called ===")
        console.log("Items received:")
        input.items.forEach((item, idx) => {
            console.log(`  [${idx}] ${item.title}: unitPrice=${item.unitPrice}, quantity=${item.quantity}, total=${item.unitPrice * item.quantity}`)
        })

        // Calculate total amount from items
        const totalAmount = input.items.reduce((sum, item) => {
            return sum + item.unitPrice * item.quantity
        }, 0)
        
        console.log(`Total amount to charge: ${totalAmount} MXN`)

        // Create a unique order_id by appending a timestamp
        const uniqueOrderId = `${input.externalReference}-${Date.now()}`

        // For Openpay with direct charges via Openpay.js:
        // The frontend will use Openpay.js to tokenize card details
        // The backend will receive the token and create a charge
        // No hosted checkout URL - customer enters details in Medusa checkout
        
        const preferenceId = uniqueOrderId
        
        console.log("Openpay preference created")
        console.log("  Preference ID:", preferenceId)
        console.log("  Amount to charge:", totalAmount, "MXN")
        console.log("  Using Openpay.js for frontend tokenization")

        // Return preference - for Openpay, initPoint is just the preferenceId
        // (not a URL like MercadoPago, but needed for type compatibility)
        return {
            preferenceId,
            initPoint: `openpay:${preferenceId}`, // Special marker for Openpay.js flow
            sandboxInitPoint: this.config?.sandbox ? `openpay:${preferenceId}` : undefined,
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

    async createChargeWithToken(
        preferenceId: string,
        tokenId: string,
        amount: number,
        description: string,
        payer: {
            email: string
            firstName?: string
            lastName?: string
        }
    ): Promise<PaymentInfo> {
        this.ensureConfigured()

        console.log("=== Creating Openpay charge with token ===")
        console.log("  Preference ID:", preferenceId)
        console.log("  Token ID:", tokenId)
        console.log("  Amount:", amount, "MXN")
        console.log("  Description:", description)
        console.log("  Payer:", payer.email)

        return new Promise((resolve, reject) => {
            const chargeData = {
                source_id: tokenId,
                amount: amount,
                currency: "MXN",
                order_id: preferenceId,
                description: description,
                customer: {
                    email: payer.email,
                    name: payer.firstName || "Customer",
                    last_name: payer.lastName || "",
                },
                device_session_id: "", // Can be added later for fraud detection
            }

            console.log("Calling charges.create() with:", {
                ...chargeData,
                source_id: "[REDACTED]",
            })

            this.client!.charges.create(chargeData, (error: any, body: any) => {
                if (error) {
                    console.error("Openpay charge error:", error)
                    reject(new Error(`Openpay charge error: ${error.description || error.message}`))
                    return
                }

                console.log("Charge created successfully")
                console.log("  Charge ID:", body.id)
                console.log("  Status:", body.status)
                console.log("  Amount:", body.amount)

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
