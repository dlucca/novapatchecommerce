import { model } from "@medusajs/framework/utils"

/**
 * Data model for subscription plans
 * Allows dynamic configuration of subscription plans from admin
 */
const SubscriptionPlan = model.define("subscription_plan", {
  id: model.id().primaryKey(),
  code: model.text().unique(),
  name: model.text(),
  interval_days: model.number(),
  free_shipping_threshold: model.number().nullable(),
  description: model.text(),
  promotion_code: model.text(),
  is_active: model.boolean().default(true),
  sort_order: model.number().default(0),
  created_at: model.dateTime(),
  updated_at: model.dateTime(),
})

export default SubscriptionPlan
