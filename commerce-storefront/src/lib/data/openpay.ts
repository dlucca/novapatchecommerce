"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, removeCartId } from "./cookies"
import { revalidateTag } from "next/cache"

/**
 * Create Openpay payment preference and get redirect URL
 */
export async function createOpenpayPreference(cartId: string) {
    const headers = {
        ...(await getAuthHeaders()),
    }

    const response = await sdk.client.fetch<{
        preferenceId: string
        initPoint: string
        sandboxInitPoint: string
    }>(`/store/payment/preference`, {
        method: "POST",
        headers,
        body: { cartId },
    })

    return response
}

interface CompleteOrderResponse {
    success: boolean
    orderId?: string
    orderStatus?: string
    paymentStatus?: string
    error?: string
    alreadyCompleted?: boolean
}

export async function verifyAndCompleteOpenpayOrder(cartId: string, paymentId?: string): Promise<{
    success: boolean
    orderId?: string
    error?: string
}> {
    const headers = {
        ...(await getAuthHeaders()),
        'Content-Type': 'application/json',
    }

    try {
        const response = await sdk.client.fetch<CompleteOrderResponse>(
            `/store/payment/complete-order`,
            {
                method: "POST",
                headers,
                body: { cartId, paymentId },
            }
        )

        if (response.success && response.orderId) {
            await removeCartId()
            revalidateTag("carts")
            revalidateTag("orders")

            return {
                success: true,
                orderId: response.orderId,
            }
        }

        return {
            success: false,
            error: response.error || "Could not complete order",
        }
    } catch (error: any) {
        console.error("Error completing order:", error)

        const errorMessage = error.body?.error || error.message || "Failed to complete order"

        return {
            success: false,
            error: errorMessage,
        }
    }
}

export async function getOpenpayPublicKey(): Promise<string> {
    try {
        const response = await sdk.client.fetch<{ publicKey: string }>(`/store/payment/config`, {
            method: "GET",
        })
        return response.publicKey
    } catch (error) {
        console.error("Error fetching Openpay public key:", error)
        return process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY || ""
    }
}

interface OrderStatusResponse {
    status: "pending" | "processing" | "completed" | "failed"
    orderId?: string
    paymentStatus?: string
    message?: string
}

export async function checkOpenpayOrderStatus(cartId: string, paymentId?: string): Promise<OrderStatusResponse> {
    try {
        const params = new URLSearchParams({ cartId })
        if (paymentId) {
            params.append("paymentId", paymentId)
        }

        const response = await sdk.client.fetch<OrderStatusResponse>(
            `/store/payment/order-status?${params.toString()}`,
            { method: "GET" }
        )

        return response
    } catch (error: any) {
        console.error("Error checking order status:", error)
        return {
            status: "failed",
            message: error.message || "Failed to check order status",
        }
    }
}

interface HandleOpenpayPaymentInput {
    tokenId: string
    preferenceId: string
    amount: number
    description: string
}

export async function handleOpenpayPayment(input: HandleOpenpayPaymentInput): Promise<{
    success: boolean
    paymentId?: string
    error?: string
}> {
    const headers = {
        ...(await getAuthHeaders()),
        'Content-Type': 'application/json',
    }

    try {
        const response = await sdk.client.fetch<{
            success: boolean
            paymentId?: string
            error?: string
        }>(`/store/payment/openpay-charge`, {
            method: "POST",
            headers,
            body: input,
        })

        return {
            success: response.success,
            paymentId: response.paymentId,
            error: response.error,
        }
    } catch (error: any) {
        console.error("Error processing Openpay payment:", error)

        const errorMessage = error.body?.error || error.message || "Failed to process payment"

        return {
            success: false,
            error: errorMessage,
        }
    }
}
