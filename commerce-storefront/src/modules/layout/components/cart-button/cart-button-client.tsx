"use client"

import { StoreCart } from "@medusajs/types"
import CartDropdown from "../cart-dropdown"

interface CartButtonClientProps {
  cart: StoreCart | null
  scrolled: boolean
}

export default function CartButtonClient({ cart, scrolled }: CartButtonClientProps) {
  return <CartDropdown cart={cart} scrolled={scrolled} />
}
