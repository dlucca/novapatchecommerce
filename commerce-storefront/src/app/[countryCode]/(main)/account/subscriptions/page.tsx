import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Mis Suscripciones",
  description: "Gestiona tus suscripciones activas",
}

export default async function Subscriptions() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }
  // TODO: Fetch subscriptions from Medusa
  return (
    <div className="w-full" data-testid="subscriptions-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Mis Suscripciones</h1>
        <p className="text-base-regular">
          Gestiona tus suscripciones activas.
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Heading level="h3" className="text-lg font-semibold mb-2">
          No tienes suscripciones activas
        </Heading>
        <Text className="text-gray-600 mb-4">
          Suscríbete a nuestros productos y recibe envíos automáticos cada mes con descuentos exclusivos.
        </Text>
        <LocalizedClientLink
          href="/store"
          className="inline-block bg-novapatch-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors"
        >
          Ver Planes de Suscripción
        </LocalizedClientLink>
      </div>
    </div>
  )
}

