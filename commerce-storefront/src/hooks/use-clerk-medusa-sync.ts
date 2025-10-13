"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"
import { logger } from "@lib/util/logger"

/**
 * Hook for syncing users from Clerk to Medusa
 */
export function useClerkMedusaSync() {
  const { user, isLoaded, isSignedIn } = useUser()
  const syncedRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded) {
      logger.debug("Clerk still loading...")
      return
    }

    if (!isSignedIn || !user) {
      logger.debug("User not authenticated")
      return
    }

    if (syncedRef.current === user.id) {
      logger.debug("User already synced:", user.id)
      return
    }

    const syncUserWithMedusa = async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress
        
        if (!email) {
          logger.warn("Clerk user has no email", { context: 'ClerkMedusaSync' })
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/custom/create-customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
          body: JSON.stringify({
            email: email,
            first_name: user.firstName || "",
            last_name: user.lastName || "",
            clerk_user_id: user.id,
          }),
        })

        logger.debug(`Medusa sync response status: ${response.status}`)

        if (response.ok) {
          const data = await response.json()
          logger.debug("Medusa sync response data:", data)
          
          const customerId = data.customer?.id || data.id || 'registered'
          
          logger.success(`User registered in Medusa: ${customerId}`)
          syncedRef.current = user.id
          
          logger.info("Welcome email should have been sent by subscriber")
        } else if (response.status === 422 || response.status === 409) {
          logger.debug(`User already exists in Medusa (status: ${response.status})`)
          syncedRef.current = user.id
        } else {
          const errorText = await response.text()
          logger.error(`Failed to sync with Medusa: ${response.status}`, new Error(errorText), { context: 'ClerkMedusaSync' })
        }
      } catch (error) {
        logger.error("Error during Clerk-Medusa synchronization", error as Error, { context: 'ClerkMedusaSync' })
      }
    }

    const timeoutId = setTimeout(() => {
      syncUserWithMedusa()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [user, isLoaded, isSignedIn])
}
