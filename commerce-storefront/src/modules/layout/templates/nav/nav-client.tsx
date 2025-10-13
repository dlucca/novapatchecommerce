"use client"

import { Suspense, useState } from "react"
import { SignInButton } from '@clerk/nextjs'
import { Search, ShoppingCart, User } from 'lucide-react'
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import SideMenu from "@modules/layout/components/side-menu"
import AuthUserButton from "@components/auth/user-button"
import CountrySelectorClient from "@modules/layout/components/country-selector/country-selector-client"
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
  regions: StoreRegion[]
  user: SerializedUser | null
  cart: HttpTypes.StoreCart | null
}

export default function NavClient({ regions, user, cart }: NavClientProps) {
  const scrolled = useScroll(50)
  const [searchOpen, setSearchOpen] = useState(false)
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "mx" // Detecta scroll después de 50px

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className={`relative h-12 sm:h-14 lg:h-16 xl:h-14 2xl:h-12 mx-auto duration-300 transition-all ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full relative">

          {/* Navegación Izquierda - Solo desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <LocalizedClientLink
              href="/store"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              data-testid="nav-store-link"
            >
              Comprar
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store"
              className={`text-sm font-bold transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              data-testid="nav-products-link"
            >
              Productos
            </LocalizedClientLink>

            {user ? (
              <LocalizedClientLink
                href="/collections"
                className={`text-sm font-bold transition-colors duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                data-testid="nav-collections-link"
              >
                Suscripción
              </LocalizedClientLink>
            ) : (
              <span
                className={`text-sm font-bold cursor-not-allowed ${
                  scrolled ? 'text-gray-400' : 'text-gray-400'
                }`}
                title="Inicia sesión para acceder a suscripciones"
              >
                Suscripción
              </span>
            )}
          </div>

          {/* Logo Centrado */}
          <div className="flex items-center justify-center flex-1 md:flex-none">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2"
              data-testid="nav-home-link"
            >
              <Image
                src="/assets/nav/Logo.svg"
                alt="Novapatch Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-novapatch-title">
                NovaPatch
              </span>
            </LocalizedClientLink>
          </div>

          {/* Elementos de la Derecha */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {/* Selector de País */}
            <CountrySelectorClient />

            {/* Icono de Búsqueda */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              aria-label="Buscar productos"
              data-testid="nav-search-button"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Carrito con Dropdown */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className={`relative p-2 transition-colors duration-200 ${
                    scrolled
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
              }
            >
              <CartDropdown cart={cart} scrolled={scrolled} />
            </Suspense>

            {/* Icono de login para no logueados */}
            {!user && (
              <SignInButton mode="redirect">
                <button
                  className={`p-2 transition-colors duration-200 ${
                    scrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  aria-label="Iniciar Sesión"
                  title="Iniciar Sesión"
                >
                  <User className="w-5 h-5" />
                </button>
              </SignInButton>
            )}

            {/* Avatar/menú para usuarios logueados */}
            {user && <AuthUserButton />}
          </div>

          {/* Mobile Menu - Solo visible en móvil */}
          <div className="flex items-center md:hidden">
            <SideMenu regions={regions} />
          </div>

          {/* Search Box - Inline */}
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
