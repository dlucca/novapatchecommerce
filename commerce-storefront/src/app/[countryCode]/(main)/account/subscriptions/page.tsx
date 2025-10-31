import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { retrieveCustomer } from "@lib/data/customer"
import { getCustomerSubscriptions } from "@lib/data/subscriptions"
import SubscriptionsList from "@modules/account/components/subscriptions-list"

export const metadata: Metadata = {
  title: "Mis Suscripciones",
  description: "Gestiona tus suscripciones activas",
}

export default async function Subscriptions() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Get Medusa customer
  const customer = await retrieveCustomer()
  
  // If no customer, show empty state (user might not have made a purchase yet)
  if (!customer) {
    return (
      <div className="w-full" data-testid="subscriptions-page-wrapper">
        <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Mis Suscripciones</h1>
          <p className="text-base-regular">
            Gestiona tus suscripciones activas.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            No tienes suscripciones activas
          </h3>
          <p className="text-gray-600 mb-4">
            Suscríbete a nuestros productos y recibe envíos automáticos con descuentos exclusivos.
          </p>
          <a
            href="/subscriptions"
            className="inline-block bg-novapatch-button text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-button/90 transition-colors"
          >
            Ver Planes de Suscripción
          </a>
        </div>
      </div>
    )
  }

  // Fetch customer subscriptions
  // Note: This will return empty array until backend endpoints are created
  const { subscriptions } = await getCustomerSubscriptions(customer.id)

  return (
    <div className="w-full" data-testid="subscriptions-page-wrapper">
      <SubscriptionsList 
        customer={customer}
        subscriptions={subscriptions}
      />
    </div>
  )
}

