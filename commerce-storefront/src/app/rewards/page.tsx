import { Heading, Text } from "@medusajs/ui"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: "Nova Rewards - NovaPatch",
  description: "Programa de recompensas exclusivo para clientes de NovaPatch. Gana puntos y obtén beneficios únicos.",
}

export default async function NovaRewards() {
  const user = await currentUser()
  
  // Redirigir a login si no está autenticado
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading level="h1" className="text-4xl md:text-5xl font-bold mb-6">
            Nova Rewards
          </Heading>
          <Text className="text-xl opacity-90 leading-relaxed">
            Programa de recompensas exclusivo para clientes NovaPatch.
            Gana puntos con cada compra y desbloquea beneficios únicos.
          </Text>
        </div>
      </div>

      {/* User Status */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Heading level="h2" className="text-2xl font-bold text-gray-900 mb-2">
                ¡Hola, {user.firstName || 'Cliente'}!
              </Heading>
              <Text className="text-gray-600">
                Nivel actual: <span className="font-semibold text-blue-600">Novato</span>
              </Text>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <Text className="text-gray-600">Puntos disponibles</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        
        {/* Cómo funciona */}
        <section className="mb-16">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ¿Cómo Funciona Nova Rewards?
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Compra</Heading>
              <Text className="text-gray-600">
                Gana 1 punto por cada $10 MXN gastados en productos NovaPatch
              </Text>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Acumula</Heading>
              <Text className="text-gray-600">
                Acumula puntos con cada compra y actividad en la plataforma
              </Text>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Canjea</Heading>
              <Text className="text-gray-600">
                Canjea tus puntos por descuentos, productos gratis y beneficios exclusivos
              </Text>
            </div>
          </div>
        </section>

        {/* Niveles */}
        <section className="mb-16">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Niveles de Recompensas
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-blue-500">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">N</span>
              </div>
              <Heading level="h4" className="font-semibold mb-2">Novato</Heading>
              <Text className="text-gray-600 text-sm mb-4">0 - 99 puntos</Text>
              <Text className="text-blue-600 font-semibold">¡Tu nivel actual!</Text>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">B</span>
              </div>
              <Heading level="h4" className="font-semibold mb-2">Bronce</Heading>
              <Text className="text-gray-600 text-sm mb-4">100 - 499 puntos</Text>
              <Text className="text-gray-500">5% descuento extra</Text>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">P</span>
              </div>
              <Heading level="h4" className="font-semibold mb-2">Plata</Heading>
              <Text className="text-gray-600 text-sm mb-4">500 - 999 puntos</Text>
              <Text className="text-gray-500">10% descuento extra</Text>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">O</span>
              </div>
              <Heading level="h4" className="font-semibold mb-2">Oro</Heading>
              <Text className="text-gray-600 text-sm mb-4">1000+ puntos</Text>
              <Text className="text-gray-500">15% descuento extra</Text>
            </div>
          </div>
        </section>

        {/* Formas de ganar puntos */}
        <section className="mb-16">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Formas de Ganar Puntos
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <Heading level="h3" className="text-xl font-semibold mb-4 text-blue-800">Compras</Heading>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Compra de productos</span>
                  <span className="font-semibold">1 punto / $10 MXN</span>
                </li>
                <li className="flex justify-between">
                  <span>Primera compra</span>
                  <span className="font-semibold">+50 puntos</span>
                </li>
                <li className="flex justify-between">
                  <span>Suscripción mensual</span>
                  <span className="font-semibold">+25 puntos</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <Heading level="h3" className="text-xl font-semibold mb-4 text-green-800">Actividades</Heading>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Reseña de producto</span>
                  <span className="font-semibold">+20 puntos</span>
                </li>
                <li className="flex justify-between">
                  <span>Referir un amigo</span>
                  <span className="font-semibold">+100 puntos</span>
                </li>
                <li className="flex justify-between">
                  <span>Cumpleaños</span>
                  <span className="font-semibold">+50 puntos</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center text-white">
          <Heading level="h2" className="text-3xl font-bold mb-4">
            ¡Comienza a Ganar Puntos Hoy!
          </Heading>
          <Text className="text-xl mb-8 opacity-90">
            Haz tu primera compra y obtén 50 puntos de bienvenida
          </Text>
          <a 
            href="/store" 
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
          >
            Explorar Productos
          </a>
        </section>
      </div>
    </div>
  )
}
