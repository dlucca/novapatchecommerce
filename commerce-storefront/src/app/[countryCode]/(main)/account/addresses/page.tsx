import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import AddressesTemplate from "@modules/account/pages/addresses-template"

export const metadata: Metadata = {
  title: "Direcciones",
  description: "Ver tus direcciones",
}

export default async function AddressesPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // TODO: Fetch addresses from Medusa
  return <AddressesTemplate />
}

