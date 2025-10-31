import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * GET /admin/subscription-plans
 * List all subscription plans
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION)
    const plans = await pgConnection("subscription_plan")
      .orderBy("sort_order", "asc")

    return res.status(200).json({
      subscription_plans: plans,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch subscription plans",
      details: error.message,
    })
  }
}

/**
 * POST /admin/subscription-plans
 * Create a new subscription plan
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const {
    code,
    name,
    interval_days,
    free_shipping_threshold,
    description,
    promotion_code,
    is_active = true,
    sort_order = 0,
  } = req.body as {
    code: string
    name: string
    interval_days: number
    free_shipping_threshold: number | null
    description: string
    promotion_code: string
    is_active?: boolean
    sort_order?: number
  }

  if (!code || !name || !interval_days || !promotion_code) {
    return res.status(400).json({
      error: "Missing required fields: code, name, interval_days, promotion_code",
    })
  }

  try {
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION)
    
    const existing = await pgConnection("subscription_plan")
      .where({ code })
      .first()
      
    if (existing) {
      return res.status(400).json({
        error: `Subscription plan with code ${code} already exists`,
      })
    }

    const now = new Date()
    const [plan] = await pgConnection("subscription_plan")
      .insert({
        code,
        name,
        interval_days,
        free_shipping_threshold,
        description,
        promotion_code,
        is_active,
        sort_order,
        created_at: now,
        updated_at: now,
      })
      .returning("*")

    return res.status(201).json({
      subscription_plan: plan,
      message: "Subscription plan created successfully",
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to create subscription plan",
      details: error.message,
    })
  }
}
