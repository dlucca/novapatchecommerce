import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Badge, Table, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { ShoppingBag } from "@medusajs/icons"

// TODO: Suscripciones - refactor
type Subscription = {
  id: string
  customer_id: string
  plan: "monthly" | "bimonthly" | "quarterly"
  status: "active" | "paused" | "cancelled"
  next_order_date: string
  created_at: string
}

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    paused: 0,
    cancelled: 0,
  })

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/admin/subscriptions?limit=100", {
          credentials: "include",
        })
        const result = await response.json()
        const subs = result.subscriptions || []
        setSubscriptions(subs)

        // Calcular estadísticas
        setStats({
          total: subs.length,
          active: subs.filter((s: Subscription) => s.status === "active")
            .length,
          paused: subs.filter((s: Subscription) => s.status === "paused")
            .length,
          cancelled: subs.filter((s: Subscription) => s.status === "cancelled")
            .length,
        })
      } catch (error) {
        console.error("Error fetching subscriptions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const getPlanLabel = (plan: string) => {
    const labels: Record<string, string> = {
      monthly: "Mensual",
      bimonthly: "Bimestral",
      quarterly: "Trimestral",
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
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag />
          <Heading level="h1">Suscripciones</Heading>
        </div>
        <Text>Cargando...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag />
        <Heading level="h1">Suscripciones</Heading>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="border border-ui-border-base rounded-lg p-4">
          <Text className="text-ui-fg-subtle text-sm mb-1">Total</Text>
          <Text className="text-2xl font-semibold">{stats.total}</Text>
        </div>
        <div className="border border-ui-border-base rounded-lg p-4">
          <Text className="text-ui-fg-subtle text-sm mb-1">Activas</Text>
          <Text className="text-2xl font-semibold text-green-600">
            {stats.active}
          </Text>
        </div>
        <div className="border border-ui-border-base rounded-lg p-4">
          <Text className="text-ui-fg-subtle text-sm mb-1">Pausadas</Text>
          <Text className="text-2xl font-semibold text-orange-600">
            {stats.paused}
          </Text>
        </div>
        <div className="border border-ui-border-base rounded-lg p-4">
          <Text className="text-ui-fg-subtle text-sm mb-1">Canceladas</Text>
          <Text className="text-2xl font-semibold text-red-600">
            {stats.cancelled}
          </Text>
        </div>
      </div>

      {/* Tabla de suscripciones */}
      {subscriptions.length === 0 ? (
        <div className="border border-ui-border-base rounded-lg p-8 text-center">
          <Text className="text-ui-fg-subtle">
            No hay suscripciones registradas.
          </Text>
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Plan</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Próxima Orden</Table.HeaderCell>
              <Table.HeaderCell>Creada</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subscriptions.map((subscription) => (
              <Table.Row key={subscription.id}>
                <Table.Cell>
                  <Text className="font-mono text-sm">
                    {subscription.id.slice(0, 8)}...
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text>{getPlanLabel(subscription.plan)}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    color={getStatusColor(subscription.status)}
                    size="small"
                  >
                    {getStatusLabel(subscription.status)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text className="text-sm">
                    {new Date(subscription.next_order_date).toLocaleDateString(
                      "es-ES"
                    )}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text className="text-sm">
                    {new Date(subscription.created_at).toLocaleDateString(
                      "es-ES"
                    )}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={`/app/customers/${subscription.customer_id}`}
                    className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-sm"
                  >
                    Ver cliente →
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Suscripciones",
  icon: ShoppingBag,
})

export default SubscriptionsPage

