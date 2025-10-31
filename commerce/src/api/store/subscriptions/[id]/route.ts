import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { updateSubscriptionWorkflow } from "../../../../workflows/update-subscription"

/**
 * GET /store/subscriptions/:id
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: "Subscription ID is required" })
  }

  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: { id },
    })

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({ error: "Subscription not found" })
    }

    return res.status(200).json({
      subscription: subscriptions[0],
    })
  } catch (error: any) {
    console.error("Error fetching subscription:", error)
    return res.status(500).json({
      error: "Failed to fetch subscription",
      details: error.message,
    })
  }
}

/**
 * PATCH /store/subscriptions/:id
 */
export async function PATCH(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params
  const {
    customer_id,
    plan,
    product_variants,
    shipping_address_id,
    status,
  } = req.body as {
    customer_id: string
    plan?: "monthly" | "bimonthly" | "quarterly"
    product_variants?: Array<{ variant_id: string; quantity: number }>
    shipping_address_id?: string
    status?: "active" | "paused" | "cancelled"
  }

  if (!id) {
    return res.status(400).json({ error: "Subscription ID is required" })
  }

  if (!customer_id) {
    return res.status(400).json({ error: "customer_id is required" })
  }

  try {
    const { result: subscription } = await updateSubscriptionWorkflow(
      req.scope
    ).run({
      input: {
        subscription_id: id,
        customer_id,
        plan,
        product_variants,
        shipping_address_id,
        status,
      },
    })

    return res.status(200).json({
      subscription,
      message: "Subscription updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating subscription:", error)
    return res.status(500).json({
      error: "Failed to update subscription",
      details: error.message,
    })
  }
}

