import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateSubscriptionWorkflow } from "../../../../../workflows/update-subscription"

/**
 * POST /store/subscriptions/:id/pause
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params
  const { customer_id } = req.body as { customer_id: string }

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
        status: "paused",
      },
    })

    return res.status(200).json({
      subscription,
      message: "Subscription paused successfully",
    })
  } catch (error: any) {
    console.error("Error pausing subscription:", error)
    return res.status(500).json({
      error: "Failed to pause subscription",
      details: error.message,
    })
  }
}

