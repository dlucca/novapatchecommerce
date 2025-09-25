import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="border-t border-ui-border-base w-full bg-gray-50">
      <div className="content-container flex flex-col w-full">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-6">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              NovaPatch
            </LocalizedClientLink>
            <Text className="text-sm text-gray-600 mt-1 max-w-sm">
              Parches médicos innovadores para tu bienestar
            </Text>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <LocalizedClientLink
              href="/about-patches"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sobre Parches
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/info"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Información
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/sign-in"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Iniciar Sesión
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/rewards"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Rewards
            </LocalizedClientLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <Text className="text-xs">
            © {new Date().getFullYear()} NovaPatch. Todos los derechos reservados.
          </Text>
          <Text className="text-xs">
            Hecho con ❤️ para tu bienestar
          </Text>
        </div>
      </div>
    </footer>
  )
}
