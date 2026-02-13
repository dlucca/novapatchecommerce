import { getOrSetCart } from "@lib/data/cart"
import { logger } from "@lib/util/logger"
import CartTemplate from "@modules/cart/pages"
import { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"
import { HttpTypes } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Carrito",
  description: "Ver tu carrito de compras",
}

type PageProps = {
  params: Promise<{ countryCode: string }>
}

export default async function Cart({ params }: PageProps) {
  const { countryCode } = await params
  
  const cart = await getOrSetCart(countryCode).catch((error) => {
    logger.error("Failed to retrieve cart", error as Error, { context: 'CartPage' })
    return null
  })

  const clerkUser = await currentUser()

  const customer = clerkUser ? ({
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    first_name: clerkUser.firstName || '',
    last_name: clerkUser.lastName || '',
    default_billing_address_id: null,
    default_shipping_address_id: null,
    company_name: null,
  } as HttpTypes.StoreCustomer) : null

  return <CartTemplate cart={cart} customer={customer} />
}
