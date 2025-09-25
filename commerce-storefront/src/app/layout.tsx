import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200',
          card: 'shadow-lg border border-gray-200',
          headerTitle: 'text-blue-600 font-bold',
          headerSubtitle: 'text-gray-600',
        },
        variables: {
          colorPrimary: '#2563eb',
        },
      }}
    >
      <html lang="es" data-mode="light">
        <body>
          <main className="relative">{props.children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
