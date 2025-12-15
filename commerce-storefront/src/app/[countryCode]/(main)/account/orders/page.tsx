import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import OrdersTemplate from "@modules/account/pages/orders-template"

export const metadata: Metadata = {
  title: "Pedidos",
  description: "Resumen de tus pedidos anteriores.",
}

type PageProps = {
  params: {
    countryCode: string
  }
}

export default async function OrdersPage({ params }: PageProps) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // TODO: Fetch orders from Medusa
  return <OrdersTemplate countryCode={params.countryCode} />
}

