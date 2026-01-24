import type { IPaymentGateway } from "./payment-gateway.interface"
import type {
  CreateSubscriptionInput,
  SubscriptionResult,
  SubscriptionInfo,
  SubscriptionStatus,
} from "../types"

export interface ISubscriptionGateway extends IPaymentGateway {
  createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionResult>
  getSubscription(subscriptionId: string): Promise<SubscriptionInfo>
  getSubscriptionByReference(externalReference: string): Promise<SubscriptionInfo | null>
  updateSubscriptionStatus(subscriptionId: string, status: SubscriptionStatus): Promise<SubscriptionInfo>
  cancelSubscription(subscriptionId: string): Promise<void>
  pauseSubscription(subscriptionId: string): Promise<void>
  resumeSubscription(subscriptionId: string): Promise<void>
  searchSubscriptions(params: {
    payerEmail?: string
    externalReference?: string
    status?: SubscriptionStatus
  }): Promise<SubscriptionInfo[]>
}

