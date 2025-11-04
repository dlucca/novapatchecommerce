"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders } from "./cookies"

export type SubscriptionPlan = string

export type Subscription = {
  id: string
  customer_id: string
  plan: SubscriptionPlan
  status: "active" | "paused" | "cancelled"
  next_order_date: string
  product_variants: Array<{ variant_id: string; quantity: number }>
  shipping_address_id: string | null
  region_id: string
  metadata: any
  created_at: string
  updated_at: string
}

export type SubscriptionPlanConfig = {
  id: string
  code: string
  name: string
  interval_days: number
  free_shipping_threshold: number | null
  description: string
  promotion_code: string
  is_active: boolean
  sort_order: number
  promotion?: {
    id: string
    code: string
    type: string
    value: number
    currency_code?: string
    is_automatic: boolean
    status: string
  } | null
}

/**
 * Get available subscription plans (active only)
 */
export async function getSubscriptionPlans(): Promise<{
  subscription_plans: SubscriptionPlanConfig[]
}> {
  return sdk.client
    .fetch<{ subscription_plans: SubscriptionPlanConfig[] }>("/store/subscription-plans", {
      method: "GET",
    })
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Get customer subscriptions
 */
export async function getCustomerSubscriptions(
  customerId: string
): Promise<{ subscriptions: Subscription[] }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscriptions: Subscription[] }>(
      `/store/subscriptions?customer_id=${customerId}`,
      {
        method: "GET",
        headers,
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Get subscription details
 */
export async function getSubscription(
  subscriptionId: string
): Promise<{ subscription: Subscription | null }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscription: Subscription }>(
      `/store/subscriptions/${subscriptionId}`,
      {
        method: "GET",
        headers,
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Create a new subscription
 */
export async function createSubscription(data: {
  customer_id: string
  plan: SubscriptionPlan
  product_variants: Array<{ variant_id: string; quantity: number }>
  shipping_address_id?: string
  region_id: string
}): Promise<{ subscription: Subscription | null; message: string }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscription: Subscription; message: string }>(
      "/store/subscriptions",
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Update a subscription
 */
export async function updateSubscription(
  subscriptionId: string,
  data: {
    customer_id: string
    plan?: SubscriptionPlan
    product_variants?: Array<{ variant_id: string; quantity: number }>
    shipping_address_id?: string
    status?: "active" | "paused" | "cancelled"
  }
): Promise<{ subscription: Subscription | null; message: string }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscription: Subscription; message: string }>(
      `/store/subscriptions/${subscriptionId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Pause a subscription
 */
export async function pauseSubscription(
  subscriptionId: string,
  customerId: string
): Promise<{ subscription: Subscription | null; message: string }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscription: Subscription; message: string }>(
      `/store/subscriptions/${subscriptionId}/pause`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ customer_id: customerId }),
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  customerId: string
): Promise<{ subscription: Subscription | null; message: string }> {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client
    .fetch<{ subscription: Subscription; message: string }>(
      `/store/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ customer_id: customerId }),
      }
    )
    .then((data) => data)
    .catch(medusaError)
}

