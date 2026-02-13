import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/pages/account-layout"
import { HttpTypes } from "@medusajs/types"

export default async function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const customer = {
    id: user.id,
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    email: user.emailAddresses[0]?.emailAddress || '',
    default_billing_address_id: null,
    default_shipping_address_id: null,
    company_name: null,
  } as HttpTypes.StoreCustomer

  return (
    <AccountLayout customer={customer}>
      {children}
      <Toaster />
    </AccountLayout>
  )
}
