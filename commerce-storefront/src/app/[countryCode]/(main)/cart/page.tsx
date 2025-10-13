import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { logger } from "@lib/util/logger"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrito",
  description: "Ver tu carrito de compras",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    logger.error("Failed to retrieve cart", error as Error, { context: 'CartPage' })
    return null
  })

  const customer = await retrieveCustomer().catch(() => null)

  return <CartTemplate cart={cart} customer={customer} />
}
