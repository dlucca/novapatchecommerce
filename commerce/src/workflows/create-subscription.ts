import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  calculateNextOrderDate,
  type SubscriptionPlan,
} from "../lib/subscription-config"
import { updateCustomerSubscriptionMetadataStep } from "./steps/update-customer-subscription-metadata"

type CreateSubscriptionInput = {
  customer_id: string
  plan: SubscriptionPlan
  product_variants: Array<{ variant_id: string; quantity: number }>
  shipping_address_id?: string
  region_id: string
}

const createSubscriptionStep = createStep(
  "create-subscription-step",
  async (input: CreateSubscriptionInput, { container }) => {
    const nextOrderDate = calculateNextOrderDate(input.plan)

    const manager = container.resolve("manager") as any
    
    const now = new Date()
    const subscription = manager.create("subscription", {
      customer_id: input.customer_id,
      plan: input.plan,
      status: "active",
      next_order_date: nextOrderDate,
      product_variants: input.product_variants,
      shipping_address_id: input.shipping_address_id || null,
      region_id: input.region_id,
      metadata: {
        created_via: "api",
      },
      created_at: now,
      updated_at: now,
    })

    await manager.persistAndFlush(subscription)

    return new StepResponse(subscription, subscription.id)
  },
  async (subscriptionId, { container }) => {
    if (subscriptionId) {
      const manager = container.resolve("manager") as any
      const subscription = await manager.findOne("subscription", { id: subscriptionId })
      if (subscription) {
        await manager.removeAndFlush(subscription)
      }
    }
  }
)

export const createSubscriptionWorkflow = createWorkflow(
  "create-subscription",
  (input: CreateSubscriptionInput) => {
    const subscription = createSubscriptionStep(input)

    updateCustomerSubscriptionMetadataStep({
      customer_id: input.customer_id,
      plan: input.plan,
      subscription_id: subscription.id,
      status: "active",
    })

    return new WorkflowResponse(subscription)
  }
)

