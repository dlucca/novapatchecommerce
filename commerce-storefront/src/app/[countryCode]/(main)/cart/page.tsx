import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrito",
  description: "Ver tu carrito de compras",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error("Error retrieving cart:", error)
    return null
  })

  const customer = await retrieveCustomer().catch(() => null)

  return <CartTemplate cart={cart} customer={customer} />
}
