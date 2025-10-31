import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { createSubscriptionWorkflow } from "../workflows/create-subscription"

/**
 * Subscriber: Create subscription after order is placed
 */
export default async function subscriptionCreatedHandler({ 
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService = container.resolve(Modules.ORDER)
  const cartModuleService = container.resolve(Modules.CART)
  
  try {
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["items"]
    })
    
    
    const subscriptionItems = order.items?.filter((item: any) => 
      item.metadata?.is_subscription === true
    ) || []
    
    if (subscriptionItems.length === 0) {
      return
    }
    
    const itemsByPlan = subscriptionItems.reduce((acc: any, item: any) => {
      const plan = item.metadata?.subscription_plan || 'bimonthly'
      if (!acc[plan]) {
        acc[plan] = []
      }
      acc[plan].push({
        variant_id: item.variant_id,
        quantity: item.quantity,
      })
      return acc
    }, {})
    
    for (const [plan, variants] of Object.entries(itemsByPlan)) {
      try {
        const { result: subscription } = await createSubscriptionWorkflow(container).run({
          input: {
            customer_id: order.customer_id!,
            plan: plan as "monthly" | "bimonthly" | "quarterly",
            product_variants: variants as Array<{ variant_id: string; quantity: number }>,
            shipping_address_id: order.shipping_address?.id,
            region_id: order.region_id!,
          },
        })
        
      } catch (error: any) {
        // Error logged, subscription creation failed for this plan
      }
    }
    
  } catch (error: any) {
    // Error logged, order continues
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}

