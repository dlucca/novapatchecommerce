"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

/**
 * Create Mercado Pago payment preference and get redirect URL
 */
export async function createMercadoPagoPreference(cartId: string) {
    const headers = {
        ...(await getAuthHeaders()),
        'Content-Type': 'application/json',
    }

    const response = await sdk.client.fetch<{ 
        preferenceId: string
        initPoint: string
        sandboxInitPoint: string 
    }>(`/store/mercadopago/preference`, {
        method: "POST",
        headers,
        body: { cartId },
    })

    return response
}

/**
 * Process payment with Mercado Pago
 */
export async function processMercadoPagoPayment(data: {
    cartId: string
    paymentData: any
}) {
    const headers = {
        ...(await getAuthHeaders()),
    }

    return sdk.client.fetch(`/store/mercadopago/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    })
}

/**
 * Get Mercado Pago public key from backend
 */
export async function getMercadoPagoPublicKey(): Promise<string> {
    try {
        const response = await sdk.client.fetch<{ publicKey: string }>(`/mercadopago/config`, {
            method: "GET",
        })
        return response.publicKey
    } catch (error) {
        console.error("Error fetching Mercado Pago public key:", error)
        return process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || ""
    }
}
