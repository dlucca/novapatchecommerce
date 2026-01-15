import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * GET /mercadopago/config
 * Returns Mercado Pago public key for frontend initialization
 * This endpoint is public (no authentication required)
 */
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    res.json({
        publicKey: process.env.MERCADOPAGO_PUBLIC_KEY || '',
    })
}
