import SubscriptionsHeroSection from "./sections/hero-section"
import SubscriptionsWhySection from "./sections/why-section"
import SubscriptionsHowItWorksSection from "./sections/how-it-works-section"
import SubscriptionsPricingSection from "./sections/pricing-section"
import FAQSection from "@modules/home/components/faq-section"

export default function SubscriptionsPageTemplate() {
  return (
    <div className="min-h-screen bg-white">
      <SubscriptionsHeroSection />
      <SubscriptionsWhySection />
      <SubscriptionsHowItWorksSection />
      <SubscriptionsPricingSection />
      <FAQSection />
    </div>
  )
}

