import { currentUser } from '@clerk/nextjs/server'
import { listRegions } from "@lib/data/regions"
import { retrieveCart } from "@lib/data/cart"
import { logger } from "@lib/util/logger"
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
    logger.error('Failed to get current user', error as Error, { context: 'Nav' })
  }

  const regions = featureFlags.ENABLE_COUNTRY_SELECTOR
    ? await listRegions().then((regions: StoreRegion[]) => regions)
    : []

  const cart = await retrieveCart().catch(() => null)

  return <NavClient user={user} cart={cart} />
}
