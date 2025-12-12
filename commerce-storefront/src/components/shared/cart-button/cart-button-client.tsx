"use client"

import { StoreCart } from "@medusajs/types"
import CartDropdown from "../cart-dropdown"

interface CartButtonClientProps {
  cart: StoreCart | null
}

export default function CartButtonClient({ cart }: CartButtonClientProps) {
  return <CartDropdown cart={cart} />
}
