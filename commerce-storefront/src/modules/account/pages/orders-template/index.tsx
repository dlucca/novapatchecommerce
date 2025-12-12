import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OrdersTemplateProps = {
  countryCode: string
}

export default function OrdersTemplate({ countryCode }: OrdersTemplateProps) {
  // TODO: Fetch orders from Medusa and pass as props
  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Mis Pedidos</h1>
        <p className="text-base-regular">
          Ver tus pedidos anteriores y su estado.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Heading level="h3" className="text-lg font-semibold mb-2">
          No tienes pedidos
        </Heading>
        <Text className="text-gray-600 mb-4">
          Cuando realices tu primera compra, aparecerá aquí.
        </Text>
        <LocalizedClientLink
          href="/store/zencore-patch"
          className="inline-block bg-novapatch-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors"
        >
          Ir a la Tienda
        </LocalizedClientLink>
      </div>
    </div>
  )
}

