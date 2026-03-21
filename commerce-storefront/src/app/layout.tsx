import { Metadata, Viewport } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import ClerkMedusaSyncProvider from "@/providers/clerk-medusa-sync"
import { Outfit } from 'next/font/google'
import "../styles/globals.css"
import { getTranslations } from "next-intl/server"
import { getBaseURL } from "@lib/util/env"

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Novapatch - Parches de Bienestar Natural",
    template: "%s | Novapatch"
  },
  description: "Descubre los parches de bienestar de Novapatch. La forma más limpia y práctica de incorporar vitaminas y minerales a tu rutina diaria.",
  keywords: ["parches de bienestar", "vitaminas", "wellness", "salud", "suplementos", "bienestar natural", "novapatch"],
  authors: [{ name: "Novapatch" }],
  other: {
    charset: "UTF-8"
  }
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#2C5697" }],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const tCommon = await getTranslations("common")
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200',
          card: 'shadow-lg border border-gray-200',
          headerTitle: 'text-blue-600 font-bold',
          headerSubtitle: 'text-gray-600',
        },
        variables: {
          colorPrimary: '#2C5697',
          fontFamily: 'var(--font-outfit), Outfit, -apple-system, BlinkMacSystemFont, sans-serif',
        },
      }}
    >
      <html lang="es" data-mode="light" className={outfit.variable} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://clerk.com" />
          <link rel="preconnect" href="https://img.clerk.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://img.clerk.com" />
        </head>
        <body className={`${outfit.variable} ${outfit.className}`} suppressHydrationWarning>
          <ClerkMedusaSyncProvider>
            <a href="#main-content" className="skip-to-content">
              {tCommon("skipToContent")}
            </a>

            <main id="main-content" className="relative">{props.children}</main>
          </ClerkMedusaSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
