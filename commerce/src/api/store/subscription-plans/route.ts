import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { listActiveSubscriptionPlans } from "../../../lib/subscription-config"

/**
 * GET /store/subscription-plans
 * List all active subscription plans for customers
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const plans = await listActiveSubscriptionPlans(req.scope)

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
