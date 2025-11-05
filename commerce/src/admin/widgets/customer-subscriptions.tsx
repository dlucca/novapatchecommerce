import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Badge, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"

type Subscription = {
  id: string
  plan: "monthly" | "bimonthly" | "quarterly"
  status: "active" | "paused" | "cancelled"
  next_order_date: string
  created_at: string
}

const CustomerSubscriptionsWidget = ({ data }: { data: any }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  const customerId = data?.id

  useEffect(() => {
    if (!customerId) {return}

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          `/admin/subscriptions?customer_id=${customerId}`,
          {
            credentials: "include",
          }
        )
        const result = await response.json()
        setSubscriptions(result.subscriptions || [])
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [customerId])

  const getPlanLabel = (plan: string) => {
    const labels: Record<string, string> = {
      monthly: "Mensual (15%)",
      bimonthly: "Bimestral (20%)",
      quarterly: "Trimestral (25%)",
    }
    return labels[plan] || plan
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

  if (loading) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Suscripciones</Heading>
        </div>
        <div className="px-6 py-4">
          <Text className="text-ui-fg-subtle">Cargando...</Text>
        </div>
      </Container>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Suscripciones</Heading>
        </div>
        <div className="px-6 py-4">
          <Text className="text-ui-fg-subtle">
            Este cliente no tiene suscripciones activas.
          </Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Suscripciones</Heading>
        <Badge size="small">{subscriptions.length}</Badge>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex items-center justify-between border border-ui-border-base rounded-lg p-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Text className="font-medium">
                    {getPlanLabel(subscription.plan)}
                  </Text>
                  <Badge color={getStatusColor(subscription.status)} size="small">
                    {getStatusLabel(subscription.status)}
                  </Badge>
                </div>
                <Text className="text-ui-fg-subtle text-sm">
                  Próxima orden:{" "}
                  {new Date(subscription.next_order_date).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Text>
                <Text className="text-ui-fg-subtle text-xs">
                  Creada:{" "}
                  {new Date(subscription.created_at).toLocaleDateString(
                    "es-ES"
                  )}
                </Text>
              </div>
              <a
                href={`/app/subscriptions/${subscription.id}`}
                className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-sm"
              >
                Ver detalles →
              </a>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.details.after",
})

export default CustomerSubscriptionsWidget

