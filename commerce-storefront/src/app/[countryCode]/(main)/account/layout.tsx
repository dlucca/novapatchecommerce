import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/pages/account-layout"

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
  }

  return (
    <AccountLayout customer={customer as any}>
      {children}
      <Toaster />
    </AccountLayout>
  )
}
