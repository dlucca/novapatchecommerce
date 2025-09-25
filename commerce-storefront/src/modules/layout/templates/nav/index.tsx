import { Suspense } from "react"
import { currentUser } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import AuthUserButton from "@components/auth/user-button"
import { featureFlags } from "@lib/feature-flags"

export default async function Nav() {
  const user = await currentUser()
  const regions = featureFlags.ENABLE_COUNTRY_SELECTOR
    ? await listRegions().then((regions: StoreRegion[]) => regions)
    : []

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">

          {/* Mobile Menu - Solo visible en móvil */}
          <div className="flex items-center small:hidden">
            <SideMenu regions={regions} />
          </div>

          {/* Logo Centrado - Estilo NovaPatch */}
          <div className="flex items-center justify-center flex-1 small:flex-none">
            <LocalizedClientLink
              href="/"
              className="text-2xl small:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 tracking-wide"
              data-testid="nav-store-link"
            >
              NovaPatch
            </LocalizedClientLink>
          </div>

          {/* Navegación Principal - Solo desktop */}
          <div className="hidden small:flex items-center justify-center flex-1 gap-x-8">
            <LocalizedClientLink
              href="/store"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 uppercase tracking-wide"
              data-testid="nav-store-link"
            >
              Productos
            </LocalizedClientLink>

{user ? (
              <LocalizedClientLink
                href="/collections"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 uppercase tracking-wide"
                data-testid="nav-collections-link"
              >
                Suscripciones
              </LocalizedClientLink>
            ) : (
              <span
                className="text-sm font-medium text-gray-400 cursor-not-allowed uppercase tracking-wide"
                title="Inicia sesión para acceder a suscripciones"
              >
                Suscripciones
              </span>
            )}

            <LocalizedClientLink
              href="/about-patches"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 uppercase tracking-wide"
              data-testid="nav-about-patches-link"
            >
              Sobre Parches
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/info"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 uppercase tracking-wide"
              data-testid="nav-info-link"
            >
              Info
            </LocalizedClientLink>
          </div>

          {/* Elementos de Usuario - Derecha */}
          <div className="flex items-center gap-x-4 justify-end flex-1 small:flex-none">

            {/* Nova Rewards - Solo desktop y usuarios logueados */}
            {user && (
              <div className="hidden small:flex">
                <LocalizedClientLink
                  href="/rewards"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 uppercase tracking-wider"
                  data-testid="nav-rewards-link"
                >
                  Nova Rewards
                </LocalizedClientLink>
              </div>
            )}

            {/* Carrito - Solo usuarios logueados */}
            {featureFlags.ENABLE_CART && user && (
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                    </svg>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            )}

            {/* Botón de login para no logueados */}
            {!user && (
              <SignInButton mode="redirect">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm shadow-md hover:shadow-lg">
                  Iniciar Sesión
                </button>
              </SignInButton>
            )}

            {/* Avatar/menú para usuarios logueados */}
            {user && <AuthUserButton />}
          </div>
        </nav>
      </header>
    </div>
  )
}
