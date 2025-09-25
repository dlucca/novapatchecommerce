import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-gradient-to-br from-blue-50 to-green-50">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span className="max-w-4xl">
          <Heading
            level="h1"
            className="text-4xl md:text-6xl leading-tight text-ui-fg-base font-bold mb-4"
          >
            Parches Médicos Innovadores
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-relaxed text-ui-fg-subtle font-normal"
          >
            Descubre una nueva forma de cuidar tu bienestar con nuestros parches médicos de última generación.
            Suscripciones personalizadas disponibles en México y Brasil.
          </Heading>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <LocalizedClientLink href="/store">
            <Button size="large" className="px-8 py-3">
              Explorar Productos
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections">
            <Button variant="secondary" size="large" className="px-8 py-3">
              Ver Suscripciones
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
