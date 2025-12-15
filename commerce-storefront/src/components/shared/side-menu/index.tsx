"use client"

import { useEffect, useState } from "react"
import { XMark, ArrowRightOnRectangle } from "@medusajs/icons"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useClerk } from "@clerk/nextjs"
import { useTranslations } from "next-intl"

// Menú lateral actualizado con nuevas opciones
const getSideMenuItems = () => {
  const t = useTranslations("menu")
  const items: Record<string, string> = {
    [t("home")]: "/",
    [t("store")]: "/store",
    [t("subscriptions")]: "/subscriptions",
    [t("about")]: "/about",
    [t("myAccount")]: "/account",
  }

  return items
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const SideMenuItems = getSideMenuItems()
  const { signOut } = useClerk()

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const handleLogout = async () => {
    await signOut()
    setIsOpen(false)
  }
  void regions
  const tFooter = useTranslations("footer")
  const t = useTranslations("menu")
  return (
    <>
      <button
        type="button"
        aria-controls="mobile-sidebar"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        data-testid="nav-menu-button"
        className="inline-flex items-center justify-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-novapatch-primary/40 transition-colors duration-200"
      >
        <span className="sr-only">Abrir menú</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <aside
        id="mobile-sidebar"
        className={`fixed top-0 left-0 z-50 w-72 h-screen flex flex-col transform transition-transform duration-300 ease-in-out bg-white shadow-2xl border-r border-gray-100 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="h-16 flex items-center justify-center">
            <Image
              src="/assets/nav/LOGO-1.svg"
              width={120}
              height={80}
              alt="Novapatch"
              className="object-contain"
            />
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
            data-testid="close-menu-button"
          >
            <XMark className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col h-full px-4 py-6">
          <ul className="space-y-2">
            {Object.entries(SideMenuItems).map(([name, href]) => (
              <li key={name}>
                <LocalizedClientLink
                  href={href}
                  onClick={closeMenu}
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-novapatch-bg-light hover:text-novapatch-button"
                  data-testid={`${name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}-link`}
                >
                  <span>{name}</span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleLogout}
              data-testid="mobile-logout-button"
              className="w-full group flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-red-600 transition-colors duration-200 hover:bg-red-50"
            >
              <span className="flex items-center gap-3">
                <ArrowRightOnRectangle className="w-5 h-5" />
                <span>{t("logout")}</span>
              </span>
            </button>
            <p className="mt-4 text-xs text-gray-500 text-center">
              &copy; {new Date().getFullYear()} {tFooter("reserve")}
            </p>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default SideMenu
