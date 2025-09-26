"use client"

import { Suspense } from "react"
import { SignInButton } from '@clerk/nextjs'
import Image from "next/image"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import SideMenu from "@modules/layout/components/side-menu"
import AuthUserButton from "@components/auth/user-button"
import { useScroll } from "../../../../hooks/use-scroll"

interface NavClientProps {
  regions: StoreRegion[]
  user: any
}

export default function NavClient({ regions, user }: NavClientProps) {
  const scrolled = useScroll(50) // Detecta scroll después de 50px

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header
        className={`relative h-16 mx-auto duration-300 transition-all ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-white/95 backdrop-blur-sm shadow-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full">

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
              className="flex items-center space-x-2"
              data-testid="nav-home-link"
            >
              <Image
                src="/images/nav/Logo.svg"
                alt="Novapatch Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <Image
                src="/images/nav/Name.svg"
                alt="Novapatch"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
            </LocalizedClientLink>
          </div>

          {/* Elementos de la Derecha */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {/* Icono de Búsqueda */}
            <button className={`p-2 transition-colors duration-200 ${
              scrolled
                ? 'text-gray-700 hover:text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Carrito */}
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </LocalizedClientLink>
              }
            >
              <div className={`relative p-2 transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-700 hover:text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
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
                  title="Iniciar Sesión"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
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
        </nav>
      </header>
    </div>
  )
}
