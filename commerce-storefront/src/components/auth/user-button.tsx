'use client'

import { UserButton, useUser, SignInButton } from '@clerk/nextjs'
import { User } from 'lucide-react'

export default function AuthUserButton() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  if (isSignedIn) {
    return (
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
        userProfileMode="navigation"
        userProfileUrl="/account"
      />
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
