import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createSubscriptionWorkflow } from "../../../workflows/create-subscription"

/**
 * POST /store/subscriptions
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const {
    customer_id,
    plan,
    product_variants,
    shipping_address_id,
    region_id,
  } = req.body as {
    customer_id: string
    plan: "monthly" | "bimonthly" | "quarterly"
    product_variants: Array<{ variant_id: string; quantity: number }>
    shipping_address_id?: string
    region_id: string
  }

  if (!customer_id) {
    return res.status(400).json({ error: "customer_id is required" })
  }

  if (!plan || !["monthly", "bimonthly", "quarterly"].includes(plan)) {
    return res.status(400).json({
      error: "plan must be one of: monthly, bimonthly, quarterly",
    })
  }

  if (!product_variants || product_variants.length === 0) {
    return res.status(400).json({
      error: "product_variants is required and must not be empty",
    })
  }

  if (!region_id) {
    return res.status(400).json({ error: "region_id is required" })
  }

  try {
    const { result: subscription } = await createSubscriptionWorkflow(
      req.scope
    ).run({
      input: {
        customer_id,
        plan,
        product_variants,
        shipping_address_id,
        region_id,
      },
    })

    return res.status(201).json({
      subscription,
      message: "Subscription created successfully",
    })
  } catch (error: any) {
    console.error("Error creating subscription:", error)
    return res.status(500).json({
      error: "Failed to create subscription",
      details: error.message,
    })
  }
}

/**
 * GET /store/subscriptions?customer_id=xxx
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { customer_id } = req.query as { customer_id?: string }

  if (!customer_id) {
    return res.status(400).json({ error: "customer_id query parameter is required" })
  }

  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: { customer_id },
    })

    return res.status(200).json({
      subscriptions: subscriptions || [],
    })
  } catch (error: any) {
    console.error("Error fetching subscriptions:", error)
    return res.status(500).json({
      error: "Failed to fetch subscriptions",
      details: error.message,
    })
  }
}

