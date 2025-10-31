import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

type UpdateCustomerSubscriptionMetadataInput = {
  customer_id: string
  subscription_id?: string
  plan?: string
  status?: string
}

/**
 * Step shared to update customer subscription metadata
 * Used by create-subscription and update-subscription workflows
 */
export const updateCustomerSubscriptionMetadataStep = createStep(
  "update-customer-subscription-metadata-step",
  async (input: UpdateCustomerSubscriptionMetadataInput, { container }) => {
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    
    const customer = await customerModuleService.retrieveCustomer(input.customer_id)
    const previousMetadata = customer.metadata || {}
    const newMetadata = { ...previousMetadata }

    if (input.subscription_id !== undefined) {
      newMetadata.subscription_id = input.subscription_id
    }

    if (input.plan !== undefined) {
      newMetadata.subscription_plan = input.plan
    }

    if (input.status !== undefined) {
      newMetadata.subscription_status = input.status
    }

    await customerModuleService.updateCustomers(input.customer_id, {
      metadata: newMetadata,
    })

    return new StepResponse(
      { success: true }, 
      { customer_id: input.customer_id, previousMetadata }
    )
  },
  async (rollbackData, { container }) => {
    // Rollback: restaurar metadata anterior
    if (rollbackData) {
      const customerModuleService = container.resolve(Modules.CUSTOMER)
      await customerModuleService.updateCustomers(rollbackData.customer_id, {
        metadata: rollbackData.previousMetadata,
      })
    }
  }
)
