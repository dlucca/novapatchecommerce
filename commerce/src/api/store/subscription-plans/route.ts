import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { listActiveSubscriptionPlans } from "../../../lib/subscription-config"

/**
 * GET /store/subscription-plans
 * List all active subscription plans for customers with their promotion details
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const plans = await listActiveSubscriptionPlans(req.scope)
    const promotionModuleService = req.scope.resolve(Modules.PROMOTION)

    const plansWithPromotions = await Promise.all(
      plans.map(async (plan) => {
        try {
          const promotions = await promotionModuleService.listPromotions(
            {
              code: plan.promotion_code,
            },
            {
              relations: ["application_method"],
            }
          )

          if (promotions.length > 0) {
            const promotion = promotions[0]
            console.log(`✅ Promotion found:`, {
              id: promotion.id,
              code: promotion.code,
              application_method: promotion.application_method,
            })

            const applicationMethod = Array.isArray(promotion.application_method)
              ? promotion.application_method[0]
              : promotion.application_method

            console.log(`📊 Application method:`, applicationMethod)

            return {
              ...plan,
              promotion: {
                id: promotion.id,
                code: promotion.code,
                type: applicationMethod?.type,
                value: applicationMethod?.value,
                currency_code: applicationMethod?.currency_code,
                is_automatic: promotion.is_automatic,
                status: promotion.status,
              },
            }
          }

          return {
            ...plan,
            promotion: null,
          }
        } catch (error: any) {
          console.error(`❌ Error fetching promotion for ${plan.promotion_code}:`, error.message)
          return {
            ...plan,
            promotion: null,
          }
        }
      })
    )

    return res.status(200).json({
      subscription_plans: plansWithPromotions,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch subscription plans",
      details: error.message,
    })
  }
}
