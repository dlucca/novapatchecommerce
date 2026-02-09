"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from 'next-intl'

import SideMenu from "@/components/shared/side-menu"
import AuthUserButton from "@modules/account/components/user-button"
import CartDropdown from "@/components/shared/cart-dropdown"
import SearchBox from "@modules/search/components/search-box"
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

export default function NavClient({ cart }: NavClientProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "mx"
  const t = useTranslations('nav')
  const tCommon = useTranslations("common")

  const cartFallback = (
    <LocalizedClientLink
      className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
      href="/cart"
      data-testid="nav-cart-link"
    >
      <Image
        src="/assets/nav/cart.svg"
        alt={tCommon("cartIconAlt")}
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        0
      </span>
    </LocalizedClientLink>
  )

  const renderCartTrigger = () => (
    <Suspense fallback={cartFallback}>
      <CartDropdown cart={cart} />
    </Suspense>
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className="relative h-12 sm:h-14 lg:h-16 xl:h-14 2xl:h-12 mx-auto bg-novapatch-bg-cream shadow-sm"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full relative">
          <div className="flex items-center gap-3 md:hidden">
            <SideMenu regions={null} />
          </div>

          <div className="hidden md:flex items-center space-x-8 flex-1">
            <LocalizedClientLink
              href="/store"
              className="text-sm font-bold hover:opacity-70 transition-opacity duration-200"
              data-testid="nav-store-link"
              style={{ color: "#3d6a96" }}
            >
              {t('store')}
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/subscriptions"
              className="text-sm font-bold hover:opacity-70 transition-opacity duration-200"
              data-testid="nav-subscriptions-link"
              style={{ color: "#3d6a96" }}
            >
              {t('subscriptions')}
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/about"
              className="text-sm font-bold hover:opacity-70 transition-opacity duration-200"
              data-testid="nav-about-link"
              style={{ color: "#3d6a96" }}
            >
              {t('about')}
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
                alt={tCommon("brandLogoAlt")}
                width={170}
                height={170}
                priority
              />
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">

            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-all duration-200"
              aria-label={tCommon("searchProducts")}
              data-testid="nav-search-button"
            >
              <Image
                src="/assets/nav/lupa.svg"
                alt={tCommon("searchIconAlt")}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>

            {renderCartTrigger()}

            <AuthUserButton />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-all duration-200"
              aria-label={tCommon("searchProducts")}
              data-testid="nav-search-button"
            >
              <Image
                src="/assets/nav/lupa.svg"
                alt={tCommon("searchIconAlt")}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>

            {renderCartTrigger()}

            <AuthUserButton />
          </div>

          <SearchBox
            isOpen={searchOpen}
            close={() => setSearchOpen(false)}
            countryCode={countryCode}
          />
        </nav>
      </header>
    </div>
  )
}
