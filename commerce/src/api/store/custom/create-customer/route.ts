import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IEventBusModuleService } from "@medusajs/framework/types"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
  const eventBusService: IEventBusModuleService = req.scope.resolve(Modules.EVENT_BUS)

  const { email, first_name, last_name, clerk_user_id } = req.body as {
    email: string
    first_name?: string
    last_name?: string
    clerk_user_id?: string
  }

  if (!email) {
    return res.status(400).json({ 
      error: "Email is required" 
    })
  }

  try {
    const existingCustomers = await customerModuleService.listCustomers({
      email: email
    })

    if (existingCustomers.length > 0) {
      console.log(`ℹ️ Customer ya existe: ${email}`)
      return res.status(200).json({
        message: "Customer already exists",
        customer: existingCustomers[0]
      })
    }

    console.log(`📝 Creando customer: ${email}`)
    const customer = await customerModuleService.createCustomers({
      email: email,
      first_name: first_name || "",
      last_name: last_name || "",
      metadata: {
        clerk_user_id: clerk_user_id,
        created_from: "clerk_sync",
        synced_at: new Date().toISOString(),
      }
    })

    await eventBusService.emit({
      name: "customer.created",
      data: { id: customer.id },
    })

    return res.status(201).json({
      message: "Customer created successfully",
      customer: customer
    })
  } catch (error: any) {
    console.error("❌ Error creando customer:", error)
    return res.status(500).json({
      error: error.message || "Failed to create customer"
    })
  }
}
