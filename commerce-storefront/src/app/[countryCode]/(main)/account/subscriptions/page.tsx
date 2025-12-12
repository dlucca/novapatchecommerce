import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { retrieveCustomer } from "@lib/data/customer"
import { getCustomerSubscriptions } from "@lib/data/subscriptions"
import SubscriptionsTemplate from "@modules/account/pages/subscriptions-template"

export const metadata: Metadata = {
  title: "Mis Suscripciones",
  description: "Gestiona tus suscripciones activas",
}

type PageProps = {
  params: {
    countryCode: string
  }
}

export default async function SubscriptionsPage({ params }: PageProps) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Get Medusa customer
  const customer = await retrieveCustomer()

  // Fetch customer subscriptions (will return empty array until backend endpoints are created)
  const { subscriptions } = customer
    ? await getCustomerSubscriptions(customer.id)
    : { subscriptions: [] }

  return (
    <SubscriptionsTemplate
      customer={customer}
      subscriptions={subscriptions}
      countryCode={params.countryCode}
    />
  )
}

