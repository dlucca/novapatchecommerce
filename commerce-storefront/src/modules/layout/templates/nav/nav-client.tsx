"use client"

import { Suspense, useState } from "react"
import { Search, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import SideMenu from "@modules/layout/components/side-menu"
import AuthUserButton from "@components/auth/user-button"
// import CountrySelectorClient from "@modules/layout/components/country-selector/country-selector-client"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import SearchBox from "@modules/search/components/search-box"
import { useScroll } from "../../../../hooks/use-scroll"
import { HttpTypes } from "@medusajs/types"
import { useParams } from "next/navigation"

interface SerializedUser {
  id: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  emailAddresses: Array<{
    id: string
    emailAddress: string
  }>
}

interface NavClientProps {
  user: SerializedUser | null
  cart: HttpTypes.StoreCart | null
}

export default function NavClient({ user, cart }: NavClientProps) {
  const scrolled = useScroll(50)
  const [searchOpen, setSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "mx"

  const cartFallback = (
    <LocalizedClientLink
      className={`relative p-2 transition-colors duration-200 ${scrolled
        ? 'text-gray-700 hover:text-blue-600'
        : 'text-gray-600 hover:text-blue-600'
        }`}
      href="/cart"
      data-testid="nav-cart-link"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        0
      </span>
    </LocalizedClientLink>
  )

  const renderCartTrigger = () => (
    <Suspense fallback={cartFallback}>
      <CartDropdown cart={cart} scrolled={scrolled} />
    </Suspense>
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className={`relative h-12 sm:h-14 lg:h-16 xl:h-14 2xl:h-12 mx-auto duration-300 transition-all ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full relative">
          <div className="flex items-center gap-3 md:hidden">
            <SideMenu regions={null} />
          </div>

          <div className="hidden md:flex items-center space-x-8 flex-1">
            <LocalizedClientLink
              href="/store"
              className={`text-sm font-bold transition-colors duration-200 ${scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              data-testid="nav-store-link"
            >
              Tienda
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/subscriptions"
              className={`text-sm font-bold transition-colors duration-200 ${scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              data-testid="nav-subscriptions-link"
            >
              Suscripciones
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/about"
              className={`text-sm font-bold transition-colors duration-200 ${scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              data-testid="nav-about-link"
            >
              Nosotros
            </LocalizedClientLink>
          </div>

          <div className="flex items-center justify-center flex-1 md:flex-none">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2"
              data-testid="nav-home-link"
            >
              <Image
                src="/assets/nav/LOGO-1.svg"
                alt="Logo de NovaPatch"
                width={150}
                height={150}
                priority
              />
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">

            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-colors duration-200 ${scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              aria-label="Buscar productos"
              data-testid="nav-search-button"
            >
              <Search className="w-5 h-5" />
            </button>

            {renderCartTrigger()}

            <AuthUserButton />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-colors duration-200 ${scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
              aria-label="Buscar productos"
              data-testid="nav-search-button"
            >
              <Search className="w-5 h-5" />
            </button>

            {renderCartTrigger()}

            <AuthUserButton />
          </div>

          <SearchBox
            isOpen={searchOpen}
            close={() => setSearchOpen(false)}
            countryCode={countryCode}
            scrolled={scrolled}
          />
        </nav>
      </header>
    </div>
  )
}
