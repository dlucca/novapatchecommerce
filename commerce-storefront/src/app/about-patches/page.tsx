import { Heading, Text } from "@medusajs/ui"

export const metadata = {
  title: "Sobre Parches - NovaPatch",
  description: "Descubre todo sobre los parches médicos innovadores de NovaPatch. Tecnología, beneficios y cómo funcionan.",
}

export default function AboutPatches() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading level="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sobre Nuestros Parches
          </Heading>
          <Text className="text-xl text-gray-600 leading-relaxed">
            Descubre la tecnología innovadora detrás de los parches médicos NovaPatch
            y cómo pueden transformar tu bienestar diario.
          </Text>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* ¿Qué son los parches? */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué son los parches médicos?
              </Heading>
              <Text className="text-lg text-gray-600 mb-4">
                Los parches médicos son sistemas de administración transdérmica que liberan 
                ingredientes activos directamente a través de la piel, proporcionando una 
                absorción controlada y sostenida.
              </Text>
              <Text className="text-lg text-gray-600">
                Esta tecnología permite una dosificación precisa y constante, evitando los 
                picos y valles asociados con otros métodos de administración.
              </Text>
            </div>
            <div className="bg-blue-100 rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Text className="text-blue-800 font-semibold">
                Tecnología Transdérmica Avanzada
              </Text>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="mb-16">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Beneficios de los Parches NovaPatch
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Absorción Rápida</Heading>
              <Text className="text-gray-600">
                Los ingredientes activos se absorben directamente en el torrente sanguíneo
              </Text>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Liberación Sostenida</Heading>
              <Text className="text-gray-600">
                Dosificación controlada durante 8-12 horas para efectos prolongados
              </Text>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <Heading level="h3" className="text-xl font-semibold mb-2">Fácil Aplicación</Heading>
              <Text className="text-gray-600">
                Aplicación simple y discreta, perfecta para uso diario
              </Text>
            </div>
          </div>
        </section>

        {/* Cómo funcionan */}
        <section className="mb-16">
          <Heading level="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ¿Cómo Funcionan?
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <Heading level="h4" className="font-semibold mb-2">Aplicación</Heading>
              <Text className="text-gray-600 text-sm">
                Retira el protector y aplica el parche en piel limpia y seca
              </Text>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <Heading level="h4" className="font-semibold mb-2">Penetración</Heading>
              <Text className="text-gray-600 text-sm">
                Los ingredientes activos penetran a través de la piel
              </Text>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <Heading level="h4" className="font-semibold mb-2">Absorción</Heading>
              <Text className="text-gray-600 text-sm">
                Se absorben directamente en el torrente sanguíneo
              </Text>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <Heading level="h4" className="font-semibold mb-2">Efecto</Heading>
              <Text className="text-gray-600 text-sm">
                Liberación sostenida durante 8-12 horas
              </Text>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-12 text-center text-white">
          <Heading level="h2" className="text-3xl font-bold mb-4">
            ¿Listo para probar NovaPatch?
          </Heading>
          <Text className="text-xl mb-8 opacity-90">
            Descubre cómo nuestros parches pueden mejorar tu bienestar diario
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/store" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Ver Productos
            </a>
            <a 
              href="/info" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Más Información
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
