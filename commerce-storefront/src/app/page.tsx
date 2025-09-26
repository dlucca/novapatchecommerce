import { featureFlags } from "@lib/feature-flags"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"
import ProductFeatures from "@components/product/product-features"
import {
  HeroSection,
  ProductPatchesSection,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection
} from "@modules/home/components"

export const metadata = {
  title: "Novapatch - Parches Médicos Innovadores",
  description: "Activa tu bienestar sin complicaciones con nuestros parches médicos innovadores. La forma más limpia y práctica de tomar vitaminas.",
}

export default async function Home() {
  // TODO: Obtener región fija para MVP
  let region = null
  try {
    region = await getRegion(featureFlags.FIXED_REGION)
  } catch (error) {
    console.log("No se pudo cargar la región:", error)
  }

  // TODO: Obtener colecciones si están habilitadas
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
      <Nav />
      <div className="min-h-screen">
        <HeroSection />
        <ProductFeatures />
        <ProductPatchesSection />
        <ComparisonSection />                   
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
      <Footer />
    </>
  )
}
