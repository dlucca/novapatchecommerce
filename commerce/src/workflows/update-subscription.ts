import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  calculateNextOrderDate,
  getSubscriptionPlanConfig,
  type SubscriptionPlan,
} from "../lib/subscription-config"
import { updateCustomerSubscriptionMetadataStep } from "./steps/update-customer-subscription-metadata"

type UpdateSubscriptionInput = {
  subscription_id: string
  status?: "active" | "paused" | "cancelled"
  plan?: SubscriptionPlan
  product_variants?: Array<{ variant_id: string; quantity: number }>
  shipping_address_id?: string
}

const updateSubscriptionStep = createStep(
  "update-subscription-step",
  async (input: UpdateSubscriptionInput, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    
    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: { id: input.subscription_id },
    })

    if (!subscriptions || subscriptions.length === 0) {
      throw new Error(`Subscription ${input.subscription_id} not found`)
    }

    const currentSubscription = subscriptions[0]
    const updateData: any = {
      updated_at: new Date(),
    }

    if (input.plan && input.plan !== currentSubscription.plan) {
      const planConfig = await getSubscriptionPlanConfig(input.plan, container)
      
      if (!planConfig) {
        throw new Error(`Subscription plan ${input.plan} not found or inactive`)
      }
      
      const nextOrderDate = calculateNextOrderDate(planConfig.interval_days)
      updateData.plan = input.plan
      updateData.next_order_date = nextOrderDate
    }

    if (input.status) {
      updateData.status = input.status
    }

    if (input.product_variants) {
      updateData.product_variants = input.product_variants
    }

    if (input.shipping_address_id !== undefined) {
      updateData.shipping_address_id = input.shipping_address_id
    }

    const manager = container.resolve("manager") as any
    const subscription = await manager.findOne("subscription", { id: input.subscription_id })
    if (subscription) {
      Object.assign(subscription, updateData)
      await manager.persistAndFlush(subscription)
    }

    const { data: updatedSubscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: { id: input.subscription_id },
    })

    return new StepResponse(updatedSubscriptions[0], currentSubscription)
  },
  async (previousSubscription, { container }) => {
    if (previousSubscription) {
      const manager = container.resolve("manager") as any
      const subscription = await manager.findOne("subscription", { id: previousSubscription.id })
      if (subscription) {
        Object.assign(subscription, {
          plan: previousSubscription.plan,
          status: previousSubscription.status,
          next_order_date: previousSubscription.next_order_date,
          product_variants: previousSubscription.product_variants,
          shipping_address_id: previousSubscription.shipping_address_id,
        })
        await manager.persistAndFlush(subscription)
      }
    }
  }
)

export const updateSubscriptionWorkflow = createWorkflow(
  "update-subscription",
  (input: UpdateSubscriptionInput & { customer_id: string }) => {
    const subscription = updateSubscriptionStep(input)

    updateCustomerSubscriptionMetadataStep({
      customer_id: input.customer_id,
      plan: input.plan,
      status: input.status,
    })

    return new WorkflowResponse(subscription)
  }
)

