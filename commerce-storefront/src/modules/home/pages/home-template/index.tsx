import { HttpTypes } from "@medusajs/types"
import {
  HeroSection,
  ProductPatchesSection,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  FAQSection,
  FeaturedProducts
} from "@modules/home/components"

type HomeTemplateProps = {
  collections?: HttpTypes.StoreCollection[] | null
  region?: HttpTypes.StoreRegion | null
  showFeaturedProducts?: boolean
}

export default function HomeTemplate({ 
  collections, 
  region,
  showFeaturedProducts = false 
}: HomeTemplateProps) {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <ProductPatchesSection />

      <ComparisonSection />

      <HowItWorksSection />

      <TestimonialsSection />
 
      {showFeaturedProducts && collections && region && (
        <div className="py-16">
          <FeaturedProducts collections={collections} region={region} />
        </div>
      )}

      <FAQSection />
    </div>
  )
}

