import { retrieveCart } from "@lib/data/cart"
import CartButtonClient from "./cart-button-client"

interface CartButtonProps {
  scrolled?: boolean
}

export default async function CartButton({ scrolled = false }: CartButtonProps) {
  const cart = await retrieveCart().catch(() => null)

  return <CartButtonClient cart={cart} scrolled={scrolled} />
}
