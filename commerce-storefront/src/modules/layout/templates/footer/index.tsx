"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Footer() {
  return (
    <footer className="w-full bg-novapatch-footer overflow-hidden">
      <div className="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32" style={{ paddingTop: 'clamp(2.5rem, 4vw, 4rem)', paddingBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
        <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_auto] md:items-start" style={{ gap: 'clamp(2rem, 3vw, 3rem)' }}>

          <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
            <h3 className="text-white font-semibold" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.75rem)' }}>Comprar</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.375rem, 0.5vw, 0.5rem)' }}>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Comprar todo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Bienestar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Protección de la piel
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Tarjeta de regalo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Al por mayor
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
            <h3 className="text-white font-semibold" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.75rem)' }}>Ayuda</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.375rem, 0.5vw, 0.5rem)' }}>
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Contáctanos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Preguntas frecuentes
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store-locator"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Localizador de tienda
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
            <h3 className="text-white font-semibold" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.75rem)' }}>Acerca de</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.375rem, 0.5vw, 0.5rem)' }}>
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Nosotros
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/why-choose-us"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Porque elegirnos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/subscribe"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Suscríbete y ahorra
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/ingredients"
                  className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                >
                  Ingredientes
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-end justify-start" style={{ gap: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>
            <div>
              <LocalizedClientLink
                href="/subscribe"
                className="inline-block bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm shadow-md"
                style={{ padding: 'clamp(0.375rem, 0.5vw, 0.5rem) clamp(1.25rem, 1.5vw, 1.5rem)' }}
              >
                Suscríbete
              </LocalizedClientLink>
            </div>

            <div className="flex" style={{ gap: 'clamp(0.75rem, 1vw, 1rem)' }}>
              <a
                href="https://instagram.com/novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-[clamp(28px,3vw,32px)] h-[clamp(28px,3vw,32px)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com/@novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="w-[clamp(28px,3vw,32px)] h-[clamp(28px,3vw,32px)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col" style={{ gap: 'clamp(1.5rem, 2vw, 2rem)' }}>
          <div>
            <h3 className="text-white font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
              Comprar
            </h3>
            <ul className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
              <li>
                <LocalizedClientLink href="/store" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Comprar todo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Bienestar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Protección de la piel
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Tarjeta de regalo
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Al por mayor
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
              Ayuda
            </h3>
            <ul className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
              <li>
                <LocalizedClientLink href="/contact" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Contáctanos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/faq" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Preguntas frecuentes
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/store-locator" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Localizador de tienda
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
              Acerca de
            </h3>
            <ul className="flex flex-col" style={{ gap: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
              <li>
                <LocalizedClientLink href="/about" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Nosotros
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/why-choose-us" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Porque elegirnos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/subscribe" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Suscríbete y ahorra
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/ingredients" className="text-white/90 hover:text-white transition-colors duration-200 text-sm">
                  Ingredientes
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center pt-6" style={{ gap: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>
            <div>
              <LocalizedClientLink
                href="/subscribe"
                className="inline-block bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm shadow-md"
                style={{ padding: 'clamp(0.5rem, 0.75vw, 0.75rem) clamp(2rem, 2.5vw, 2.5rem)' }}
              >
                Suscríbete
              </LocalizedClientLink>
            </div>

            <div className="flex" style={{ gap: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
     
              <a
                href="https://instagram.com/novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com/@novapatch"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} NovaPatch. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
