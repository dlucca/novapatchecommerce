import { Heading, Text } from "@medusajs/ui"

export default function SubscriptionsHowItWorksSection() {
  return (
    <div className="bg-novapatch-bg-light py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
          ¿Cómo Suscribirte?
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              1
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Elige tus Parches
            </Heading>
            <Text className="text-gray-600">
              Navega por nuestra tienda y selecciona los parches que necesitas.
            </Text>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              2
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Selecciona Suscripción
            </Heading>
            <Text className="text-gray-600">
              Elige la opción "Suscribirse y Ahorrar" al agregar al carrito.
            </Text>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              3
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Elige Frecuencia
            </Heading>
            <Text className="text-gray-600">
              Selecciona cada cuánto quieres recibir tus parches.
            </Text>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              4
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Recibe y Disfruta
            </Heading>
            <Text className="text-gray-600">
              Tus parches llegarán antes de que se te acaben.
            </Text>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <Text className="text-gray-700 text-lg leading-relaxed">
            La próxima vez que compres en novapatch.com, selecciona la opción <span className="font-semibold text-novapatch-button">Suscribirse y Ahorrar</span>, 
            luego agrégalo al carrito. ¡Mira esos ahorros instantáneos! Elige tu calendario de entrega y tus parches 
            llegarán antes de que se te acaben.
          </Text>
        </div>
      </div>
    </div>
  )
}

