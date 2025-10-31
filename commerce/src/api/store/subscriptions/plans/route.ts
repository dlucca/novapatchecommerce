import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { SUBSCRIPTION_PLANS } from "../../../../lib/subscription-config"

/**
 * GET /store/subscriptions/plans
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const plans = Object.entries(SUBSCRIPTION_PLANS).map(([key, config]) => ({
      id: key,
      ...config,
    }))

    return res.status(200).json({
      plans,
    })
  } catch (error: any) {
    console.error("Error fetching subscription plans:", error)
    return res.status(500).json({
      error: "Failed to fetch subscription plans",
      details: error.message,
    })
  }
}

