import { Heading, Text } from "@medusajs/ui"

export default function AddressesTemplate() {
  // TODO: Fetch addresses from Medusa and pass as props
  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Direcciones de Envío</h1>
        <p className="text-base-regular">
          Ver y actualizar tus direcciones de envío.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Heading level="h3" className="text-lg font-semibold mb-2">
          No tienes direcciones guardadas
        </Heading>
        <Text className="text-gray-600">
          Las direcciones se guardarán automáticamente cuando realices tu primera compra.
        </Text>
      </div>
    </div>
  )
}

