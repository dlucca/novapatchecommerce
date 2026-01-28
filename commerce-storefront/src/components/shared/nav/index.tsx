import { currentUser } from '@clerk/nextjs/server'
import { listRegions, getRegion } from "@lib/data/regions"
import { retrieveCart } from "@lib/data/cart"
import { logger } from "@lib/util/logger"
import { StoreRegion } from "@medusajs/types"
import { featureFlags } from "@lib/feature-flags"
import { headers } from 'next/headers'
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
    ? await listRegions().catch((error) => {
        logger.error('Failed to load regions', error as Error, { context: 'Nav' })
        return []
      })
    : []

  // Validate cart belongs to current region
  let cart = null
  try {
    const headersList = await headers()
    const countryCode = headersList.get('x-country-code')

    cart = await retrieveCart()
    
    // If we have a countryCode and a cart, validate they match
    if (cart && countryCode) {
      const region = await getRegion(countryCode)
      if (region && cart.region_id !== region.id) {
        // Cart belongs to different region, don't show it
        cart = null
      }
    }
  } catch (error) {
    logger.error('Failed to retrieve cart', error as Error, { context: 'Nav' })
  }

  return <NavClient user={user} cart={cart} />
}
