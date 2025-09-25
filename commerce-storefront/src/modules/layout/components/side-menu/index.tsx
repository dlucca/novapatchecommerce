"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

// Menú lateral actualizado con nuevas opciones
const getSideMenuItems = () => {
  const items: Record<string, string> = {
    "Inicio": "/",
    "Productos": "/store",
    "Suscripciones": "/collections",
    "Sobre Parches": "/about-patches",
    "Info": "/info",
    "Mi Cuenta": "/account",
  }

  return items
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const SideMenuItems = getSideMenuItems()
  // regions parameter kept for compatibility but not used in MVP

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-blue-600 text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white rounded-lg shadow-xl border border-gray-200 justify-between p-6"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-x-2">
                        <h3 className="text-xl font-bold text-blue-600">NovaPatch</h3>
                      </div>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <XMark className="w-6 h-6" />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-2xl font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                              onClick={close}
                              data-testid={`${name.toLowerCase().replace(/\s+/g, '-')}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <Text className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} NovaPatch. Todos los derechos reservados.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
