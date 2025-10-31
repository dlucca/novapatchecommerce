"use client"

import { useState } from "react"
import { Button, Heading, Text } from "@medusajs/ui"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const ProfileDeleteAccount = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useClerk()
  const router = useRouter()

  const handleDeleteAccount = async () => {
    if (!user) return

    setLoading(true)
    try {
      await user.delete()
      
      router.push("/")
    } catch (error) {
      console.error("Error al eliminar cuenta:", error)
      alert("Hubo un error al eliminar tu cuenta. Por favor, contacta a soporte.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col" data-testid="profile-delete-account">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <Heading className="text-base-semi mb-1">
            Zona de Peligro
          </Heading>
          <Text className="text-base-regular text-ui-fg-subtle">
            Eliminar tu cuenta de forma permanente
          </Text>
        </div>
      </div>

      {!showConfirm ? (
        <div className="mt-4">
          <Button
            variant="danger"
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar mi cuenta
          </Button>
        </div>
      ) : (
        <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-lg">
          <Heading className="text-base-semi mb-2 text-red-800">
            ⚠️ ¿Estás seguro?
          </Heading>
          <Text className="text-sm text-red-700 mb-4">
            Esta acción es <strong>irreversible</strong>. Se eliminarán todos tus datos,
            incluyendo:
          </Text>
          <ul className="list-disc list-inside text-sm text-red-700 mb-4 space-y-1">
            <li>Tu información personal</li>
            <li>Historial de pedidos</li>
            <li>Direcciones guardadas</li>
            <li>Suscripciones activas</li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Eliminando..." : "Sí, eliminar mi cuenta"}
            </button>
            <Button
              variant="secondary"
              onClick={() => setShowConfirm(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDeleteAccount

