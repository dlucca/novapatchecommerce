import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Heading level="h2" className="text-[#0A4C6D] text-xl font-semibold">
          Entrega
        </Heading>
        <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="flex flex-col"
          data-testid="shipping-address-summary"
        >
          <Text className="text-gray-500 mb-2 text-base">
            Dirección de Envío
          </Text>
          <Text className="text-[#0A4C6D] font-medium text-base">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="text-gray-700 text-base">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="text-gray-700 text-base">
            {order.shipping_address?.city},{" "}
            {order.shipping_address?.province}
          </Text>
          <Text className="text-gray-700 text-base">
            {order.shipping_address?.postal_code}
          </Text>
          <Text className="text-gray-700 text-base">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-contact-summary"
        >
          <Text className="text-gray-500 mb-2 text-base">
            Contacto
          </Text>
          <Text className="text-[#0A4C6D] font-medium text-base">
            {order.shipping_address?.phone}
          </Text>
          <Text className="text-gray-700 text-base">
            {order.email}
          </Text>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-method-summary"
        >
          <Text className="text-gray-500 mb-2 text-base">
            Método de Envío
          </Text>
          <Text className="text-[#0A4C6D] font-medium text-base">
            {(order as any).shipping_methods?.[0]?.name}
          </Text>
          <Text className="text-gray-700 text-base">
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
