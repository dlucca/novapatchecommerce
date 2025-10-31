import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import Overview from "@modules/account/components/overview"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const mockCustomer = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    first_name: user.firstName || '',
    last_name: user.lastName || '',
  }

  // TODO: Fetch orders from Medusa
  const orders = []

  return <Overview customer={mockCustomer as any} orders={orders} />
}

