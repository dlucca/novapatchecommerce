import { Metadata } from "next"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { logger } from "@lib/util/logger"
import { featureFlags } from "@lib/feature-flags"
import {
  HeroSection,
  ProductPatchesSection,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  FeaturedProducts
} from "@modules/home/components"

export const metadata: Metadata = {
  title: "NovaPatch - Parches Médicos Innovadores",
  description:
    "Activa tu bienestar sin complicaciones con nuestros parches médicos innovadores. La forma más limpia y práctica de tomar vitaminas.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  // Obtener colecciones si están habilitadas
  let collections = null
  if (featureFlags.ENABLE_COLLECTIONS && region) {
    try {
      const result = await listCollections({
        fields: "id, handle, title",
      })
      collections = result.collections
    } catch (error) {
      logger.error("Failed to load collections", error as Error, { context: 'HomePage' })
    }
  }

  return (
    <div className="min-h-screen">
      <HeroSection />

      <ProductPatchesSection />

      <ComparisonSection />

      <HowItWorksSection />

      <TestimonialsSection />
 
      {featureFlags.ENABLE_PRODUCTS && collections && region && (
        <div className="py-16">
          <FeaturedProducts collections={collections} region={region} />
        </div>
      )}

      <FAQSection />
    </div>
  )
}
