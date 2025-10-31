import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { processSubscriptionOrderWorkflow } from "../workflows/process-subscription-order"

/**
 * Scheduled Job: Process active subscriptions daily at midnight
 * Creates recurring orders for subscriptions whose next_order_date is today or earlier
 */
export default async function processSubscriptionsJob(
  container: MedusaContainer
) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("🔄 Iniciando procesamiento de suscripciones...")

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const { data: subscriptions } = await query.graph({
      entity: "subscription",
      fields: ["*"],
      filters: {
        status: "active",
        next_order_date: { $lte: today },
      },
    })

    if (!subscriptions || subscriptions.length === 0) {
      logger.info("✅ No hay suscripciones para procesar hoy")
      return
    }

    logger.info(`📦 Procesando ${subscriptions.length} suscripción(es)...`)

    let successCount = 0
    let errorCount = 0

    for (const subscription of subscriptions) {
      try {
        logger.info(
          `  → Processing subscription ${subscription.id} (plan: ${subscription.plan})`
        )

        await processSubscriptionOrderWorkflow(container).run({
          input: {
            subscription_id: subscription.id,
          },
        })

        successCount++
        logger.info(`  ✓ Subscription ${subscription.id} processed successfully`)
      } catch (error: any) {
        errorCount++
        logger.error(
          `  ✗ Error processing subscription ${subscription.id}: ${error.message}`
        )
      }
    }

    logger.info(
      `🎉 Processing completed: ${successCount} successful, ${errorCount} errors`
    )
  } catch (error: any) {
    logger.error(`❌ Error in subscriptions job: ${error.message}`)
    throw error
  }
}

export const config = {
  name: "process-subscriptions",
  schedule: "0 0 * * *",
}

