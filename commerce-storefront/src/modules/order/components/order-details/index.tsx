import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Heading level="h2" className="text-[#0A4C6D] text-xl font-semibold">
          Detalles del Pedido
        </Heading>
        <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <Text className="text-gray-500 mb-2 text-base">
            Número de Pedido
          </Text>
          <Text
            className="text-[#0A4C6D] font-medium text-lg"
            data-testid="order-id"
          >
            #{order.display_id}
          </Text>
        </div>

        <div className="flex flex-col">
          <Text className="text-gray-500 mb-2 text-base">
            Fecha del Pedido
          </Text>
          <Text className="text-gray-700 text-base" data-testid="order-date">
            {formatDate(order.created_at)}
          </Text>
        </div>

        <div className="flex flex-col">
          <Text className="text-gray-500 mb-2 text-base">
            Correo de Confirmación
          </Text>
          <Text
            className="text-gray-700 text-base"
            data-testid="order-email"
          >
            {order.email}
          </Text>
        </div>
      </div>

      {showStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              Estado del Pedido
            </Text>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#22b2bd]/10 text-[#22b2bd] font-medium">
                {formatStatus(order.fulfillment_status)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <Text className="text-gray-500 mb-2 text-base">
              Estado del Pago
            </Text>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium"
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
