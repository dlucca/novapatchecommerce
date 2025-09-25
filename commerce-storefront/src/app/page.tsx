import { featureFlags } from "@lib/feature-flags"
import Hero from "@modules/home/components/hero"
import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"

export const metadata = {
  title: "NovaPatch - Parches Médicos Innovadores",
  description: "Descubre los parches médicos más innovadores con beneficios únicos para tu bienestar. Suscripciones disponibles en México y Brasil.",
}

export default async function Home() {
  // Obtener región fija para MVP
  let region = null
  try {
    region = await getRegion(featureFlags.FIXED_REGION)
  } catch (error) {
    console.log("No se pudo cargar la región:", error)
  }

  // Obtener colecciones si están habilitadas
  let collections = null
  if (featureFlags.ENABLE_COLLECTIONS && region) {
    try {
      const result = await listCollections({
        fields: "id, handle, title",
      })
      collections = result.collections
    } catch (error) {
      console.log("No se pudieron cargar las colecciones:", error)
    }
  }

  return (
    <>
      {/* Navigation */}
      <Nav />

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products Section */}
        {featureFlags.ENABLE_PRODUCTS && collections && region && (
          <div className="py-16">
            <FeaturedProducts collections={collections} region={region} />
          </div>
        )}

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir NovaPatch?
              </h2>
              <p className="text-lg text-gray-600">
                Tecnología innovadora para tu bienestar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                <p className="text-gray-600">Productos certificados con los más altos estándares de calidad</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Acción Rápida</h3>
                <p className="text-gray-600">Resultados visibles desde la primera aplicación</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
                <p className="text-gray-600">Aplicación simple y cómoda para uso diario</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}
