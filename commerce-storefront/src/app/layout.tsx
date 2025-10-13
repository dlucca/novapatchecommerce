import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import ClerkMedusaSyncProvider from "../components/providers/clerk-medusa-sync"
import "../styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Novapatch - Parches Médicos Innovadores",
    template: "%s | Novapatch"
  },
  description: "Descubre los parches médicos innovadores de Novapatch. La forma más limpia y práctica de incorporar vitaminas y minerales a tu rutina diaria.",
  keywords: ["parches médicos", "vitaminas", "bienestar", "salud", "suplementos", "novapatch"],
  authors: [{ name: "Novapatch" }],
  colorScheme: "light",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#2C5697" }],
  other: {
    charset: "UTF-8"
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
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
        },
      }}
    >
      <html lang="es" data-mode="light" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <ClerkMedusaSyncProvider>
            <a href="#main-content" className="skip-to-content">
              Saltar al contenido principal
            </a>
            
            <main id="main-content" className="relative">{props.children}</main>
          </ClerkMedusaSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
