import { currentUser } from '@clerk/nextjs/server'
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { featureFlags } from "@lib/feature-flags"
import NavClient from "./nav-client"

export default async function Nav() {
  let user = null
  try {
    const clerkUser = await currentUser()
    if (clerkUser) {
      user = {
        id: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        emailAddresses: clerkUser.emailAddresses.map(email => ({
          id: email.id,
          emailAddress: email.emailAddress,
        })),
      }
    }
  } catch (error) {
    console.log('Error getting user:', error)
  }

  const regions = featureFlags.ENABLE_COUNTRY_SELECTOR
    ? await listRegions().then((regions: StoreRegion[]) => regions)
    : []

  return <NavClient regions={regions} user={user} />
}
