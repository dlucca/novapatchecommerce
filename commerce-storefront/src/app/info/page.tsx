import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Información - NovaPatch",
  description: "Conoce más sobre NovaPatch, nuestros parches médicos innovadores y cómo pueden mejorar tu bienestar.",
}

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre NovaPatch
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Revolucionando el cuidado de la salud con tecnología de vanguardia
          </p>
        </div>
      </section>

      {/* Información Principal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué es NovaPatch?
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                NovaPatch es una empresa innovadora especializada en el desarrollo y distribución 
                de parches médicos de última generación. Nuestros productos están diseñados para 
                ofrecer soluciones efectivas y cómodas para el cuidado de la salud.
              </p>
              <p className="text-lg text-gray-700">
                Utilizamos tecnología avanzada de liberación transdérmica para garantizar que 
                nuestros principios activos lleguen de manera eficiente y controlada al organismo.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Hacer que el cuidado de la salud sea más accesible, efectivo y cómodo para 
                personas en México y Brasil, proporcionando productos innovadores que mejoren 
                la calidad de vida.
              </p>
              <p className="text-lg text-gray-700">
                Creemos en la importancia de la prevención y el tratamiento personalizado, 
                por eso ofrecemos suscripciones adaptadas a las necesidades individuales.
              </p>
            </div>
          </div>

          {/* Características de los Productos */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Características de Nuestros Parches
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Certificación Médica</h3>
                <p className="text-gray-600">
                  Todos nuestros productos cuentan con certificaciones médicas y 
                  cumplen con los estándares internacionales de calidad.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Liberación Controlada</h3>
                <p className="text-gray-600">
                  Tecnología de liberación transdérmica que garantiza una dosificación 
                  precisa y constante durante todo el período de uso.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fácil Aplicación</h3>
                <p className="text-gray-600">
                  Diseño ergonómico y adhesivo hipoalergénico que permite una 
                  aplicación sencilla y cómoda para uso diario.
                </p>
              </div>
            </div>
          </div>

          {/* Mercados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">🇲🇽 México</h3>
              <p className="text-lg opacity-90 mb-4">
                Nuestro mercado principal donde hemos establecido una sólida presencia 
                con distribución nacional y atención personalizada.
              </p>
              <ul className="space-y-2 opacity-90">
                <li>• Envíos a todo el país</li>
                <li>• Soporte en español</li>
                <li>• Precios en pesos mexicanos</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">🇧🇷 Brasil</h3>
              <p className="text-lg opacity-90 mb-4">
                Expandiendo nuestros servicios al mercado brasileño con productos 
                adaptados a las necesidades locales.
              </p>
              <ul className="space-y-2 opacity-90">
                <li>• Distribución en ciudades principales</li>
                <li>• Soporte en portugués</li>
                <li>• Precios en reales brasileños</li>
              </ul>
            </div>
          </div>

          {/* Suscripciones */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              Suscripciones Personalizadas
            </h2>
            <p className="text-xl opacity-90 mb-6">
              Recibe tus parches médicos de forma automática según tu plan de tratamiento
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Plan Básico</h4>
                <p className="opacity-90">Entrega mensual de parches esenciales</p>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Plan Premium</h4>
                <p className="opacity-90">Entrega quincenal con productos especializados</p>
              </div>
              <div className="bg-white bg-opacity-20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Plan Personalizado</h4>
                <p className="opacity-90">Frecuencia y productos adaptados a ti</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
