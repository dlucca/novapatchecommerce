"use client"

import { Badge, Button, Heading, Text } from "@medusajs/ui"
import { useState } from "react"
import { pauseSubscription, cancelSubscription } from "@lib/data/subscriptions"

// TODO: Suscripciones - refactor
type Subscription = {
  id: string
  customer_id: string
  plan: "monthly" | "bimonthly" | "quarterly"
  status: "active" | "paused" | "cancelled"
  next_order_date: string
  created_at: string
  updated_at?: string
}

type SubscriptionCardProps = {
  subscription: Subscription
  onUpdate: () => void
}

const SubscriptionCard = ({ subscription, onUpdate }: SubscriptionCardProps) => {
  const [loading, setLoading] = useState(false)

  const getPlanInfo = (plan: string) => {
    const plans: Record<
      string,
      { name: string; discount: string; interval: string; shipping: string }
    > = {
      monthly: {
        name: "Plan Mensual",
        discount: "15% de descuento",
        interval: "Cada 30 días",
        shipping: "Envío estándar",
      },
      bimonthly: {
        name: "Plan Bimestral",
        discount: "20% de descuento",
        interval: "Cada 60 días",
        shipping: "Envío gratis si gastas más de $50",
      },
      quarterly: {
        name: "Plan Trimestral",
        discount: "25% de descuento",
        interval: "Cada 90 días",
        shipping: "Envío gratis siempre",
      },
    }
    return plans[plan] || plans.monthly
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, "green" | "orange" | "red"> = {
      active: "green",
      paused: "orange",
      cancelled: "red",
    }
    return colors[status] || "grey"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: "Activa",
      paused: "Pausada",
      cancelled: "Cancelada",
    }
    return labels[status] || status
  }

  const handlePause = async () => {
    if (!confirm("¿Estás seguro de que quieres pausar esta suscripción?")) {
      return
    }

    setLoading(true)
    try {
      await pauseSubscription(subscription.id, subscription.customer_id)
      onUpdate()
    } catch (error) {
      console.error("Error pausing subscription:", error)
      alert("Error al pausar la suscripción. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (
      !confirm(
        "¿Estás seguro de que quieres cancelar esta suscripción? Esta acción no se puede deshacer."
      )
    ) {
      return
    }

    setLoading(true)
    try {
      await cancelSubscription(subscription.id, subscription.customer_id)
      onUpdate()
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      alert("Error al cancelar la suscripción. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const planInfo = getPlanInfo(subscription.plan)

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Heading level="h3" className="text-lg font-semibold mb-1">
            {planInfo.name}
          </Heading>
          <Badge color={getStatusColor(subscription.status)} size="small">
            {getStatusLabel(subscription.status)}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">✓</span>
          <Text className="text-sm">{planInfo.discount}</Text>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">✓</span>
          <Text className="text-sm">{planInfo.interval}</Text>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">✓</span>
          <Text className="text-sm">{planInfo.shipping}</Text>
        </div>
      </div>

      {subscription.status === "active" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <Text className="text-sm text-blue-800">
            <strong>Próxima orden:</strong>{" "}
            {new Date(subscription.next_order_date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </div>
      )}

      <div className="flex gap-2">
        {subscription.status === "active" && (
          <>
            <Button
              variant="secondary"
              size="small"
              onClick={handlePause}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Pausar"}
            </Button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Cancelar"}
            </button>
          </>
        )}
        {subscription.status === "paused" && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Cancelar definitivamente"}
          </button>
        )}
        {subscription.status === "cancelled" && (
          <Text className="text-sm text-gray-500">
            Suscripción cancelada el{" "}
            {new Date(subscription.updated_at || subscription.created_at).toLocaleDateString(
              "es-ES"
            )}
          </Text>
        )}
      </div>
    </div>
  )
}

export default SubscriptionCard

