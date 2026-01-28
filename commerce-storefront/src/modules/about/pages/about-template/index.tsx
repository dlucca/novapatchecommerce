import TestimonialsSection from "@modules/home/components/testimonials-section"
import AboutHeroSection from "./sections/hero-section"
import AboutWhyPatchesSection from "./sections/why-patches-section"
import AboutHowToUseSection from "./sections/how-to-use-section"
import AboutValuesSection from "./sections/values-section"
import AboutStorySection from "./sections/story-section"

export default function AboutTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeroSection />
      <AboutWhyPatchesSection />
      <AboutHowToUseSection />
      <AboutValuesSection />
      <AboutStorySection />
      <TestimonialsSection />
    </div>
  )
}

