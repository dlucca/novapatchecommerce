"use client"

import { Badge, Button, Heading, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
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
  const t = useTranslations("accountSubscriptions")
  const locale = useLocale()
  const dateLocale = locale === "pt" ? "pt-BR" : "es-MX"
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
        t("intervalEveryDays", { days: intervalDays })

      const shippingText =
        planConfig.free_shipping_threshold === 0
          ? t("shippingAlwaysFree")
          : planConfig.free_shipping_threshold
          ? t("shippingFreeOver", { amount: planConfig.free_shipping_threshold })
          : t("shippingStandard")

      const discountText = planConfig.promotion?.type === 'percentage'
        ? t("discountPercentage", { value: planConfig.promotion.value })
        : planConfig.promotion?.type === 'fixed'
        ? t("discountAmount", { value: planConfig.promotion.value })
        : t("noDiscount")

      return {
        name: planConfig.name,
        discount: discountText,
        interval: intervalText,
        shipping: shippingText,
      }
    }

    return {
      name: t("defaultPlanName"),
      discount: t("defaultDiscount"),
      interval: t("defaultInterval"),
      shipping: t("defaultShipping"),
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
      active: t("statusActive"),
      paused: t("statusPaused"),
      cancelled: t("statusCancelled"),
    }
    return labels[status] || status
  }

  const handlePause = async () => {
    if (!confirm(t("pauseConfirm"))) {
      return
    }

    setLoading(true)
    try {
      await pauseSubscription(subscription.id, subscription.customer_id)
      onUpdate()
    } catch (error) {
      console.error("Error pausing subscription:", error)
      alert(t("pauseError"))
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    if (
      !confirm(
        t("cancelConfirm")
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
      alert(t("cancelError"))
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
            <strong>{t("nextOrder")}</strong>{" "}
            {new Date(subscription.next_order_date).toLocaleDateString(dateLocale, {
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
              {loading ? t("processing") : t("pause")}
            </Button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? t("processing") : t("cancel")}
            </button>
          </>
        )}
        {subscription.status === "paused" && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? t("processing") : t("cancelPermanent")}
          </button>
        )}
        {subscription.status === "cancelled" && (
          <Text className="text-sm text-gray-500">
            {t("cancelledOn", {
              date: new Date(subscription.updated_at || subscription.created_at).toLocaleDateString(dateLocale),
            })}
          </Text>
        )}
      </div>
    </div>
  )
}

export default SubscriptionCard
