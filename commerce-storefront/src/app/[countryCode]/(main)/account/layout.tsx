import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const { userId } = auth()

  // If user is not authenticated, redirect to sign-in
  if (!userId) {
    redirect('/sign-in')
  }

  // For now, we'll pass null as customer since we're using Clerk
  // In the future, we can sync Clerk user with Medusa customer
  return (
    <AccountLayout customer={null}>
      {dashboard}
      <Toaster />
    </AccountLayout>
  )
}
