import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * GET /admin/subscription-plans/:id
 * Get a single subscription plan
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params

  try {
    const manager = req.scope.resolve("manager") as any
    const plan = await manager.findOne("subscription_plan", { id })

    if (!plan) {
      return res.status(404).json({
        error: `Subscription plan ${id} not found`,
      })
    }

    return res.status(200).json({
      subscription_plan: plan,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch subscription plan",
      details: error.message,
    })
  }
}

/**
 * POST /admin/subscription-plans/:id
 * Update a subscription plan
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const {
    name,
    interval_days,
    free_shipping_threshold,
    description,
    promotion_code,
    is_active,
    sort_order,
  } = req.body as {
    name: string
    interval_days: number
    free_shipping_threshold: number | null
    description: string
    promotion_code: string
    is_active?: boolean
    sort_order?: number
  }

  try {
    const manager = req.scope.resolve("manager") as any
    const plan = await manager.findOne("subscription_plan", { id })

    if (!plan) {
      return res.status(404).json({
        error: `Subscription plan ${id} not found`,
      })
    }

    if (name !== undefined) plan.name = name
    if (interval_days !== undefined) plan.interval_days = interval_days
    if (free_shipping_threshold !== undefined) plan.free_shipping_threshold = free_shipping_threshold
    if (description !== undefined) plan.description = description
    if (promotion_code !== undefined) plan.promotion_code = promotion_code
    if (is_active !== undefined) plan.is_active = is_active
    if (sort_order !== undefined) plan.sort_order = sort_order
    
    plan.updated_at = new Date()

    await manager.persistAndFlush(plan)

    return res.status(200).json({
      subscription_plan: plan,
      message: "Subscription plan updated successfully",
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to update subscription plan",
      details: error.message,
    })
  }
}

/**
 * DELETE /admin/subscription-plans/:id
 * Delete a subscription plan
 */
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params

  try {
    const manager = req.scope.resolve("manager") as any
    const plan = await manager.findOne("subscription_plan", { id })

    if (!plan) {
      return res.status(404).json({
        error: `Subscription plan ${id} not found`,
      })
    }

    await manager.removeAndFlush(plan)

    return res.status(200).json({
      message: "Subscription plan deleted successfully",
      id,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to delete subscription plan",
      details: error.message,
    })
  }
}
