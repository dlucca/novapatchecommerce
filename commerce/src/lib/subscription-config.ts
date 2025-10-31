export type SubscriptionPlan = string

export interface SubscriptionPlanConfig {
  id: string
  code: string
  name: string
  interval_days: number
  free_shipping_threshold: number | null
  description: string
  promotion_code: string
  is_active: boolean
  sort_order: number
}

import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function getSubscriptionPlanConfig(
  planCode: string,
  container: any
): Promise<SubscriptionPlanConfig | null> {
  const pgConnection = container.resolve(ContainerRegistrationKeys.PG_CONNECTION)
  const plan = await pgConnection("subscription_plan")
    .where({ code: planCode, is_active: true })
    .first()
  return plan || null
}

export async function listActiveSubscriptionPlans(
  container: any
): Promise<SubscriptionPlanConfig[]> {
  const pgConnection = container.resolve(ContainerRegistrationKeys.PG_CONNECTION)
  const plans = await pgConnection("subscription_plan")
    .where({ is_active: true })
    .orderBy("sort_order", "asc")
  return plans
}

export function calculateNextOrderDate(
  intervalDays: number,
  fromDate: Date = new Date()
): Date {
  const nextDate = new Date(fromDate)
  nextDate.setDate(nextDate.getDate() + intervalDays)
  return nextDate
}

export function qualifiesForFreeShipping(
  freeShippingThreshold: number | null,
  cartTotal: number
): boolean {
  if (freeShippingThreshold === null) {
    return false
  }

  if (freeShippingThreshold === 0) {
    return true
  }

  return cartTotal >= freeShippingThreshold
}


