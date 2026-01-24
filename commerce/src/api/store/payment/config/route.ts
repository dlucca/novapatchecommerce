import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { getPaymentGatewayByRegion } from "../../../../modules/payment-gateway"

interface PaymentConfigResponse {
  publicKey: string
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { region = "br" } = req.query as { region?: string }

    const gateway = await getPaymentGatewayByRegion(region)

    const publicKey = process.env[`MERCADOPAGO_${region.toUpperCase()}_PUBLIC_KEY`] ||
                      process.env.MERCADOPAGO_PUBLIC_KEY ||
                      ""

    res.json({
      publicKey,
    } as PaymentConfigResponse)
  } catch (error: any) {
    console.error("Error fetching payment config:", error)
    res.status(500).json({
      error: "Failed to fetch payment config",
      details: error.message,
    })
  }
}
