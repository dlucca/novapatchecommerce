import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { IEventBusModuleService } from "@medusajs/framework/types"
import { checkRateLimit, getClientIP, RATE_LIMITS } from "../../../../lib/rate-limiter"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const clientIP = getClientIP(req)
  const rateLimitResult = checkRateLimit(clientIP, RATE_LIMITS.createCustomer)

  res.setHeader("X-RateLimit-Limit", RATE_LIMITS.createCustomer.maxRequests)
  res.setHeader("X-RateLimit-Remaining", rateLimitResult.remaining)
  res.setHeader("X-RateLimit-Reset", rateLimitResult.resetIn)

  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter: rateLimitResult.resetIn,
    })
  }

  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
  const eventBusService: IEventBusModuleService = req.scope.resolve(Modules.EVENT_BUS)

  const { email, first_name, last_name, clerk_user_id } = req.body as {
    email: string
    first_name?: string
    last_name?: string
    clerk_user_id?: string
  }

  // Validate email format
  if (!email) {
    return res.status(400).json({
      error: "Email is required"
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format"
    })
  }

  try {
    const existingCustomers = await customerModuleService.listCustomers({
      email: email
    })

    if (existingCustomers.length > 0) {
      return res.status(200).json({
        message: "Customer already exists",
        customer: existingCustomers[0]
      })
    }

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
