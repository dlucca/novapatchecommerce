"use client"

import { useUser, SignInButton, useClerk } from "@clerk/nextjs"
import { User, LogOut, UserCircle, Settings } from "lucide-react"
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { Fragment } from "react"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function AuthUserButton() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { signOut } = useClerk()

  if (!isLoaded) {
    return (
      <div
        className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"
        suppressHydrationWarning
      />
    )
  }

  if (isSignedIn && user) {
    const t = useTranslations("menu")
    return (
      <Popover className="relative h-full" suppressHydrationWarning>
        {() => (
          <>
            <PopoverButton className="h-full outline-none">
              <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.firstName || "User"}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute right-0 z-50 mt-3 w-64">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-white">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <LocalizedClientLink
                        href="/account/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="w-4 h-4 mr-3 text-gray-400" />
                        {t("myAccount")}
                      </LocalizedClientLink>

                      <LocalizedClientLink
                        href="/account/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        {t("myOrders")}
                      </LocalizedClientLink>

                      <LocalizedClientLink
                        href="/account/subscriptions"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        {t("mySubscriptions")}
                      </LocalizedClientLink>

                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {t("logout")}
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  return (
    <SignInButton mode="redirect">
      <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
        <User className="w-4 h-4" />
      </button>
    </SignInButton>
  )
}
