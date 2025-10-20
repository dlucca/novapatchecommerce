"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { ShoppingCart, X } from 'lucide-react'
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
  scrolled = false,
}: {
  cart?: HttpTypes.StoreCart | null
  scrolled?: boolean
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className={`flex items-center transition-colors duration-200 ${
              scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            href="/cart"
            data-testid="nav-cart-link"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-novapatch-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </div>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white rounded-lg shadow-2xl border border-gray-200 w-[380px]"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Mi carrito</h3>
              <button
                onClick={close}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="overflow-y-auto max-h-[400px] p-4">
                  <div className="space-y-4">
                    {cartState.items
                      .sort((a, b) => {
                        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                      })
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                          data-testid="cart-item"
                        >
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
                          >
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </LocalizedClientLink>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h4>
                            {item.variant?.title && item.variant.title !== "Default" && (
                              <p className="text-xs text-gray-500 mt-1">
                                {item.variant.title}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                Cantidad: {item.quantity}
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                {convertToLocale({
                                  amount: (item.unit_price || 0) * item.quantity,
                                  currency_code: cartState.currency_code,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 space-y-3">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </span>
                    <span
                      className="text-lg font-bold text-gray-900"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  {/* Botones */}
                  <div className="space-y-2">
                    <LocalizedClientLink
                      href="/cart"
                      className="block w-full text-center bg-white border-2 border-novapatch-primary text-novapatch-primary font-semibold py-2.5 px-4 rounded-lg hover:bg-novapatch-primary/10 transition-colors duration-200"
                      onClick={close}
                      data-testid="go-to-cart-button"
                    >
                      Ver carrito
                    </LocalizedClientLink>
                    <LocalizedClientLink
                      href="/checkout"
                      className="block w-full text-center bg-novapatch-primary text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-novapatch-primary/90 transition-colors duration-200"
                      onClick={close}
                    >
                      Checkout
                    </LocalizedClientLink>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm mb-4">Tu carrito está vacío</p>
                <LocalizedClientLink
                  href="/store"
                  className="inline-block bg-novapatch-primary text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-novapatch-primary/90 transition-colors duration-200"
                  onClick={close}
                >
                  Explorar productos
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
