"use client"

import { Heading, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { getSubscriptionPlans, SubscriptionPlanConfig } from "@lib/data/subscriptions"
import PricingCard from "@modules/subscriptions/components/pricing-card"

export default function SubscriptionsPricingSection() {
  const [plans, setPlans] = useState<SubscriptionPlanConfig[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await getSubscriptionPlans()
        setPlans(data.subscription_plans)
      } catch (error) {
        console.error("Error loading subscription plans:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
        Planes de Suscripción
      </Heading>
      
      {loading ? (
        <div className="text-center py-12">
          <Text className="text-gray-600">Cargando planes...</Text>
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12">
          <Text className="text-gray-600">No hay planes disponibles en este momento.</Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={plan.code === "bimonthly"}
              delay={index * 200}
            />
          ))}
        </div>
      )}
    </div>
  )
}

