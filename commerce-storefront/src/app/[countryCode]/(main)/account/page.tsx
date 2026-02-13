import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { HttpTypes } from "@medusajs/types"
import OverviewTemplate from "@modules/account/pages/overview-template"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function AccountOverviewPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const mockCustomer = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    phone: user.phoneNumbers[0]?.phoneNumber || null,
    addresses: [],
    default_billing_address_id: null,
    default_shipping_address_id: null,
    company_name: null,
  } as HttpTypes.StoreCustomer

  // TODO: Fetch orders from Medusa
  const orders: HttpTypes.StoreOrder[] = []

  return <OverviewTemplate customer={mockCustomer} orders={orders} />
}
