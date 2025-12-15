"use client"

import { useClerkMedusaSync } from "@lib/hooks/use-clerk-medusa-sync"

export default function ClerkMedusaSyncProvider({ children }: { children: React.ReactNode }) {
  useClerkMedusaSync()
  
  return <>{children}</>
}
