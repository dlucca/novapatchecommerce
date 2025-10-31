import { Heading, Text } from "@medusajs/ui"
import { CheckCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata = {
  title: "Suscripciones - NovaPatch",
  description: "Suscríbete y ahorra. Tu rutina de bienestar comienza aquí con parches NovaPatch.",
}

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-novapatch-bg-light via-blue-50 to-novapatch-bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading level="h1" className="text-4xl md:text-5xl font-bold text-novapatch-title mb-6">
            Tu Rutina de Bienestar Comienza Aquí
          </Heading>
          <Text className="text-xl text-gray-700 leading-relaxed mb-8">
            Personaliza una suscripción que funcione para ti y ahorra en cada pedido.
          </Text>
          <LocalizedClientLink
            href="/store"
            className="inline-block bg-novapatch-button hover:bg-novapatch-footer text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Suscríbete y Ahorra 20%
          </LocalizedClientLink>
        </div>
      </div>

      {/* Why It's Great Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-16 text-center">
          ¿Por Qué Es Genial?
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Benefit 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-novapatch-button" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <Heading level="h3" className="text-2xl font-semibold text-novapatch-title mb-4">
              Ahorra en Cada Caja
            </Heading>
            <Text className="text-gray-600 text-lg leading-relaxed">
              Ahorra dinero en cada pedido y nunca te preocupes por quedarte sin parches.
            </Text>
          </div>

          {/* Benefit 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-novapatch-button" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <Heading level="h3" className="text-2xl font-semibold text-novapatch-title mb-4">
              Fácilmente Personalizable
            </Heading>
            <Text className="text-gray-600 text-lg leading-relaxed">
              Pausa, omite, cambia o cancela tu suscripción en cualquier momento.
            </Text>
          </div>

          {/* Benefit 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-novapatch-button" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <Heading level="h3" className="text-2xl font-semibold text-novapatch-title mb-4">
              Garantía de 30 Días
            </Heading>
            <Text className="text-gray-600 text-lg leading-relaxed">
              Creemos que te encantará NovaPatch. Si no es así, estás cubierto.
            </Text>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-novapatch-bg-light py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
            ¿Cómo Funciona?
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

      {/* Pricing Plans Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
          Planes de Suscripción
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Mensual */}
          <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-novapatch-button transition-all duration-200 hover:shadow-xl">
            <div className="text-center mb-6">
              <Heading level="h3" className="text-2xl font-bold text-novapatch-title mb-2">
                Mensual
              </Heading>
              <Text className="text-gray-600">Perfecto para comenzar</Text>
            </div>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-novapatch-button">15%</span>
              <Text className="text-gray-600 mt-2">de descuento</Text>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Envío cada 30 días</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Cancela cuando quieras</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Modifica tu pedido fácilmente</Text>
              </li>
            </ul>
            <LocalizedClientLink
              href="/store"
              className="block w-full bg-novapatch-button hover:bg-novapatch-footer text-white text-center px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Comenzar
            </LocalizedClientLink>
          </div>

          {/* Plan Bimestral - Destacado */}
          <div className="border-2 border-novapatch-button rounded-2xl p-8 relative shadow-xl transform md:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-novapatch-testimonial text-white px-6 py-1 rounded-full text-sm font-semibold">
              Más Popular
            </div>
            <div className="text-center mb-6">
              <Heading level="h3" className="text-2xl font-bold text-novapatch-title mb-2">
                Bimestral
              </Heading>
              <Text className="text-gray-600">El favorito de nuestros clientes</Text>
            </div>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-novapatch-button">20%</span>
              <Text className="text-gray-600 mt-2">de descuento</Text>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Envío cada 60 días</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Mayor ahorro por pedido</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Envío gratis en pedidos +$50</Text>
              </li>
            </ul>
            <LocalizedClientLink
              href="/store"
              className="block w-full bg-novapatch-button hover:bg-novapatch-footer text-white text-center px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Comenzar
            </LocalizedClientLink>
          </div>

          {/* Plan Trimestral */}
          <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-novapatch-button transition-all duration-200 hover:shadow-xl">
            <div className="text-center mb-6">
              <Heading level="h3" className="text-2xl font-bold text-novapatch-title mb-2">
                Trimestral
              </Heading>
              <Text className="text-gray-600">Máximo ahorro</Text>
            </div>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-novapatch-button">25%</span>
              <Text className="text-gray-600 mt-2">de descuento</Text>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Envío cada 90 días</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">El mejor precio garantizado</Text>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <Text className="text-gray-700">Envío gratis siempre</Text>
              </li>
            </ul>
            <LocalizedClientLink
              href="/store"
              className="block w-full bg-novapatch-button hover:bg-novapatch-footer text-white text-center px-6 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Comenzar
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
            Preguntas Frecuentes
          </Heading>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                ¿Puedo cancelar mi suscripción en cualquier momento?
              </Heading>
              <Text className="text-gray-600">
                Sí, puedes cancelar, pausar o modificar tu suscripción en cualquier momento desde tu cuenta. 
                No hay compromisos ni penalizaciones.
              </Text>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                ¿Cómo cambio la frecuencia de entrega?
              </Heading>
              <Text className="text-gray-600">
                Puedes ajustar la frecuencia de entrega desde tu panel de suscripciones en cualquier momento. 
                Los cambios se aplicarán a tu próximo pedido.
              </Text>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                ¿Puedo agregar o quitar productos de mi suscripción?
              </Heading>
              <Text className="text-gray-600">
                ¡Por supuesto! Puedes personalizar tu suscripción agregando o quitando productos según tus necesidades. 
                Los cambios se reflejarán en tu próximo envío.
              </Text>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                ¿Cuándo se me cobrará?
              </Heading>
              <Text className="text-gray-600">
                Se te cobrará automáticamente antes de cada envío, según la frecuencia que hayas elegido. 
                Recibirás un correo de confirmación antes de cada cargo.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-novapatch-button to-novapatch-footer py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold mb-6">
            Comienza Tu Viaje con NovaPatch
          </Heading>
          <Text className="text-xl mb-8 opacity-90">
            Únete a miles de personas que ya disfrutan de los beneficios de nuestros parches
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink
              href="/store"
              className="bg-white text-novapatch-button px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Ver Productos
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/about-patches"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-novapatch-button transition-colors duration-200 inline-block"
            >
              Conoce Más
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
