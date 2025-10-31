import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * GET /admin/subscriptions
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { customer_id, plan, status, limit = 50, offset = 0 } = req.query as {
    customer_id?: string
    plan?: string
    status?: string
    limit?: number
    offset?: number
  }

  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

    const filters: any = {}
    if (customer_id) filters.customer_id = customer_id
    if (plan) filters.plan = plan
    if (status) filters.status = status

    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters,
      pagination: {
        skip: Number(offset),
        take: Number(limit),
      },
    })

    const { data: allSubscriptions } = await query.graph({
      entity: "subscription",
      fields: ["id"],
      filters,
    })

    return res.status(200).json({
      subscriptions: subscriptions || [],
      count: allSubscriptions?.length || 0,
      limit: Number(limit),
      offset: Number(offset),
    })
  } catch (error: any) {
    console.error("Error fetching subscriptions:", error)
    return res.status(500).json({
      error: "Failed to fetch subscriptions",
      details: error.message,
    })
  }
}

