import { retrieveCart } from "@lib/data/cart"
import { logger } from "@lib/util/logger"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server"

export const metadata: Metadata = {
  title: "Carrito",
  description: "Ver tu carrito de compras",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    logger.error("Failed to retrieve cart", error as Error, { context: 'CartPage' })
    return null
  })

  const clerkUser = await currentUser()

  const customer = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    first_name: clerkUser.firstName || '',
    last_name: clerkUser.lastName || '',
  } : null

  return <CartTemplate cart={cart} customer={customer as any} />
}
