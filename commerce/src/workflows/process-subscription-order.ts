import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createCartWorkflow } from "@medusajs/medusa/core-flows"
import {
  getSubscriptionPlanConfig,
  calculateNextOrderDate,
  type SubscriptionPlan,
} from "../lib/subscription-config"

type ProcessSubscriptionOrderInput = {
  subscription_id: string
}

const getSubscriptionDataStep = createStep(
  "get-subscription-data-step",
  async (input: ProcessSubscriptionOrderInput, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: { id: input.subscription_id },
    })

    if (!subscriptions || subscriptions.length === 0) {
      throw new Error(`Subscription ${input.subscription_id} not found`)
    }

    const subscription = subscriptions[0]

    if (subscription.status !== "active") {
      throw new Error(
        `Subscription ${input.subscription_id} is not active (status: ${subscription.status})`
      )
    }

    return new StepResponse(subscription)
  }
)

const createSubscriptionCartStep = createStep(
  "create-subscription-cart-step",
  async (
    input: {
      customer_id: string
      region_id: string
      product_variants: Array<{ variant_id: string; quantity: number }>
    },
    { container }
  ) => {
    const cartModuleService = container.resolve(Modules.CART)

    const cart = await cartModuleService.createCarts({
      currency_code: "usd",
      region_id: input.region_id,
      customer_id: input.customer_id,
      metadata: {
        is_subscription_order: true,
      },
    })

    const productModuleService = container.resolve(Modules.PRODUCT)
    const pricingService = container.resolve(Modules.PRICING)
    
    for (const variant of input.product_variants) {
      const [productVariant] = await productModuleService.listProductVariants({
        id: [variant.variant_id]
      })
      
      const prices = await pricingService.calculatePrices(
        { id: [variant.variant_id] },
        {
          context: {
            currency_code: "usd",
            region_id: input.region_id,
          }
        }
      )
      
      const variantPrice = prices[variant.variant_id]
      
      await cartModuleService.addLineItems({
        cart_id: cart.id,
        variant_id: variant.variant_id,
        quantity: variant.quantity,
        title: productVariant?.title || "Product",
        unit_price: variantPrice?.calculated_amount || 0,
      })
    }

    return new StepResponse(cart, cart.id)
  },
  async (cartId, { container }) => {
    if (cartId) {
      const cartModuleService = container.resolve(Modules.CART)
      await cartModuleService.deleteCarts([cartId])
    }
  }
)

const applySubscriptionDiscountStep = createStep(
  "apply-subscription-discount-step",
  async (
    input: {
      cart_id: string
      plan: SubscriptionPlan
    },
    { container }
  ) => {
    const promotionModuleService = container.resolve(Modules.PROMOTION)
    const planConfig = await getSubscriptionPlanConfig(input.plan, container)
    
    if (!planConfig) {
      throw new Error(`Subscription plan ${input.plan} not found or inactive`)
    }

    const promotions = await promotionModuleService.listPromotions({
      code: planConfig.promotion_code,
    })

    if (promotions.length === 0) {
      throw new Error(
        `Promotion ${planConfig.promotion_code} not found. Please create it in Medusa Admin first.`
      )
    }

    const promotion = promotions[0]
    
    if (promotion.status !== "active") {
      throw new Error(
        `Promotion ${planConfig.promotion_code} is not active (status: ${promotion.status}). Please activate it in Medusa Admin.`
      )
    }

    return new StepResponse({ promotion_id: promotion.id })
  }
)

const updateNextOrderDateStep = createStep(
  "update-next-order-date-step",
  async (
    input: {
      subscription_id: string
      plan: SubscriptionPlan
    },
    { container }
  ) => {
    const planConfig = await getSubscriptionPlanConfig(input.plan, container)
    
    if (!planConfig) {
      throw new Error(`Subscription plan ${input.plan} not found or inactive`)
    }

    const nextOrderDate = calculateNextOrderDate(planConfig.interval_days)

    const manager = container.resolve("manager") as any
    const subscription = await manager.findOne("subscription", { id: input.subscription_id })
    if (subscription) {
      subscription.next_order_date = nextOrderDate
      subscription.updated_at = new Date()
      await manager.persistAndFlush(subscription)
    }

    return new StepResponse({ success: true, next_order_date: nextOrderDate })
  }
)

export const processSubscriptionOrderWorkflow = createWorkflow(
  "process-subscription-order",
  (input: ProcessSubscriptionOrderInput) => {
    const subscription = getSubscriptionDataStep(input)

    const cart = createSubscriptionCartStep({
      customer_id: subscription.customer_id,
      region_id: subscription.region_id,
      product_variants: subscription.product_variants,
    })

    applySubscriptionDiscountStep({
      cart_id: cart.id,
      plan: subscription.plan,
    })

    updateNextOrderDateStep({
      subscription_id: input.subscription_id,
      plan: subscription.plan,
    })

    return new WorkflowResponse({
      subscription,
      cart,
      message: "Subscription order processed successfully",
    })
  }
)

