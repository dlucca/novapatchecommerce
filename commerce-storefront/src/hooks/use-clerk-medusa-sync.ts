"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"

/**
 * Hook for sinc users from Clerk to Medusa
 */
export function useClerkMedusaSync() {
  const { user, isLoaded, isSignedIn } = useUser()
  const syncedRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded) {
      console.log("⏳ Clerk aún cargando...")
      return
    }

    if (!isSignedIn || !user) {
      console.log("👤 Usuario no autenticado")
      return
    }

    if (syncedRef.current === user.id) {
      console.log("✅ Usuario ya sincronizado:", user.id)
      return
    }

    const syncUserWithMedusa = async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress
        
        if (!email) {
          console.warn("⚠️ Usuario de Clerk no tiene email")
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

        console.log("📡 Response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("📦 Response data:", data)
          
          const customerId = data.customer?.id || data.id || 'registrado'
          
          console.log("✅ Usuario registrado en Medusa:", customerId)
          syncedRef.current = user.id
          
          console.log("🎉 El subscriber debería haber enviado el email de bienvenida")
        } else if (response.status === 422 || response.status === 409) {
          console.log("ℹ️ Usuario ya existe en Medusa (status:", response.status, ")")
          syncedRef.current = user.id
        } else {
          const errorText = await response.text()
          console.error("❌ Error al sincronizar con Medusa:", response.status, errorText)
        }
      } catch (error) {
        console.error("❌ Error en sincronización:", error)
      }
    }

    const timeoutId = setTimeout(() => {
      syncUserWithMedusa()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [user, isLoaded, isSignedIn])
}
