import { model } from "@medusajs/framework/utils"

/**
 * Data model for subscription data
 * 
 * @property {string} id - ID de la suscripción
 * @property {string} customer_id - ID del cliente
 * @property {"monthly" | "bimonthly" | "quarterly"} plan - Plan de suscripción
 * @property {"active" | "paused" | "cancelled"} status - Estado de la suscripción
 * @property {Date} next_order_date - Fecha de la próxima orden automática
 * @property {Array<{ variant_id: string; quantity: number }>} product_variants - Productos en la suscripción (array de variant IDs)
 * @property {string | null} shipping_address_id - Dirección de envío (ID)
 * @property {string} region_id - Región para precios y envío
 * @property {Object | null} metadata - Metadata adicional
 * @property {Date} created_at - Timestamp de creación
 * @property {Date} updated_at - Timestamp de actualización
 */
const Subscription = model.define("subscription", {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  plan: model.enum(["monthly", "bimonthly", "quarterly"]), 
  status: model.enum(["active", "paused", "cancelled"]),
  next_order_date: model.dateTime(),
  product_variants: model.json(),
  shipping_address_id: model.text().nullable(), 
  region_id: model.text(), 
  metadata: model.json().nullable(),
  created_at: model.dateTime(),
  updated_at: model.dateTime(),
})

export default Subscription

