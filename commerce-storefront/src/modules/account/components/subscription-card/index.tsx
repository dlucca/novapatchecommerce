"use client"

import { Badge, Button, Heading, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import {
  pauseSubscription,
  cancelSubscription,
  Subscription,
  getSubscriptionPlans,
  SubscriptionPlanConfig
} from "@lib/data/subscriptions"

type SubscriptionCardProps = {
  subscription: Subscription
  onUpdate: () => void
}

const SubscriptionCard = ({ subscription, onUpdate }: SubscriptionCardProps) => {
  const [loading, setLoading] = useState(false)
  const [planConfig, setPlanConfig] = useState<SubscriptionPlanConfig | null>(null)

  useEffect(() => {
    const loadPlanConfig = async () => {
      try {
        const { subscription_plans } = await getSubscriptionPlans()
        const plan = subscription_plans.find(p => p.code === subscription.plan)
        setPlanConfig(plan || null)
      } catch (error) {
        console.error('Error loading plan config:', error)
      }
    }
    loadPlanConfig()
  }, [subscription.plan])

  const getPlanInfo = () => {
    if (planConfig) {
      const intervalDays = planConfig.interval_days
      const intervalText =
        intervalDays === 30 ? "Cada 30 días" :
        intervalDays === 60 ? "Cada 60 días" :
        intervalDays === 90 ? "Cada 90 días" :
        `Cada ${intervalDays} días`

      const shippingText =
        planConfig.free_shipping_threshold === 0 ? "Envío gratis siempre" :
        planConfig.free_shipping_threshold ? `Envío gratis si gastas más de $${planConfig.free_shipping_threshold}` :
        "Envío estándar"

      const discountText = planConfig.promotion?.type === 'percentage'
        ? `${planConfig.promotion.value}% de descuento`
        : planConfig.promotion?.type === 'fixed'
        ? `$${planConfig.promotion.value} de descuento`
        : "Sin descuento"

      return {
        name: planConfig.name,
        discount: discountText,
        interval: intervalText,
        shipping: shippingText,
      }
    }

    return {
      name: "Plan de Suscripción",
      discount: "Descuento aplicado",
      interval: "Envío automático",
      shipping: "Según plan",
    }
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

  const planInfo = getPlanInfo()

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

