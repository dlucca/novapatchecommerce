"use client"

import { Heading, Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import SubscriptionCard from "../subscription-card"
import { useRouter } from "next/navigation"

// TODO: Suscripciones - refactor
type Subscription = {
  id: string
  customer_id: string
  plan: "monthly" | "bimonthly" | "quarterly"
  status: "active" | "paused" | "cancelled"
  next_order_date: string
  created_at: string
  updated_at: string
}

type SubscriptionsListProps = {
  customer: HttpTypes.StoreCustomer
  subscriptions: Subscription[]
}

const SubscriptionsList = ({
  customer,
  subscriptions,
}: SubscriptionsListProps) => {
  const router = useRouter()

  const handleUpdate = () => {
    // Refrescar la página para obtener datos actualizados
    router.refresh()
  }

  const activeSubscriptions = subscriptions.filter((s) => s.status === "active")
  const pausedSubscriptions = subscriptions.filter((s) => s.status === "paused")
  const cancelledSubscriptions = subscriptions.filter(
    (s) => s.status === "cancelled"
  )

  return (
    <div className="w-full">
      <div className="mb-8 pb-8 border-b border-gray-200">
        <Heading level="h1" className="text-2xl font-bold mb-2">
          Mis Suscripciones
        </Heading>
        <Text className="text-gray-600">
          Gestiona tus suscripciones de NovaPatch y ahorra en cada pedido.
        </Text>
      </div>

      {subscriptions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Heading level="h3" className="text-lg font-semibold mb-2">
            No tienes suscripciones activas
          </Heading>
          <Text className="text-gray-600 mb-4">
            Suscríbete y ahorra hasta un 25% en tus productos favoritos.
          </Text>
          <a
            href="/subscribe"
            className="inline-block bg-novapatch-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors"
          >
            Ver Planes de Suscripción
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Suscripciones Activas */}
          {activeSubscriptions.length > 0 && (
            <div>
              <Heading level="h2" className="text-xl font-semibold mb-4">
                Activas ({activeSubscriptions.length})
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSubscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Suscripciones Pausadas */}
          {pausedSubscriptions.length > 0 && (
            <div>
              <Heading level="h2" className="text-xl font-semibold mb-4">
                Pausadas ({pausedSubscriptions.length})
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pausedSubscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Suscripciones Canceladas */}
          {cancelledSubscriptions.length > 0 && (
            <div>
              <Heading level="h2" className="text-xl font-semibold mb-4">
                Canceladas ({cancelledSubscriptions.length})
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cancelledSubscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA para agregar más suscripciones */}
          {activeSubscriptions.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
              <Heading level="h3" className="text-lg font-semibold mb-2">
                ¿Quieres agregar otra suscripción?
              </Heading>
              <Text className="text-gray-600 mb-4">
                Explora nuestros planes y ahorra aún más.
              </Text>
              <a
                href="/subscribe"
                className="inline-block bg-novapatch-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors"
              >
                Ver Planes
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SubscriptionsList

