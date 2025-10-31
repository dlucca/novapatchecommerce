"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders } from "./cookies"

export type SubscriptionPlan = "monthly" | "bimonthly" | "quarterly"

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

export type SubscriptionPlanInfo = {
  id: string
  name: string
  discount_percentage: number
  interval_days: number
  free_shipping_threshold: number | null
  description: string
  promotion_code: string
}

/**
 * Get available subscription plans
 */
export async function getSubscriptionPlans(): Promise<{
  plans: SubscriptionPlanInfo[]
}> {
  return sdk.client
    .fetch<{ plans: SubscriptionPlanInfo[] }>("/store/subscriptions/plans", {
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
): Promise<{ subscription: Subscription }> {
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
}): Promise<{ subscription: Subscription; message: string }> {
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
): Promise<{ subscription: Subscription; message: string }> {
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
): Promise<{ subscription: Subscription; message: string }> {
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
): Promise<{ subscription: Subscription; message: string }> {
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

