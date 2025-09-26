import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#005088' }}>
      <div className="container mx-auto px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* Columna 1: Comprar */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-medium text-base mb-3">Comprar</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Comprar todo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Bienestar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Protección de la piel
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Tarjeta de regalo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Al por mayor
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Columna 2: Ayuda */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-medium text-base mb-3">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contáctanos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Preguntas frecuentes
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store-locator"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Localizador de tienda
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Columna 3: Acerca de */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-medium text-base mb-3">Acerca de</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Nosotros
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/why-choose-us"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Porque elegirnos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/subscribe"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Suscríbete y ahorra
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/ingredients"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  Ingredientes
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Columna 4: Suscríbete y Redes Sociales */}
          <div className="flex flex-col items-start space-y-6">
            {/* Botón Suscríbete */}
            <div>
              <LocalizedClientLink
                href="/subscribe"
                className="inline-block bg-white text-blue-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm"
              >
                Suscríbete
              </LocalizedClientLink>
            </div>

            {/* Iconos de Redes Sociales */}
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
