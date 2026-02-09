"use client"

import { useEffect, useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { getSubscriptionPlans, SubscriptionPlanConfig } from "@lib/data/subscriptions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CheckCircle } from "lucide-react"

const planColors: Record<string, string> = {
  monthly: "bg-novapatch-subscription-plan-monthly",
  bimonthly: "bg-novapatch-subscription-plan-bimonthly",
  quarterly: "bg-novapatch-subscription-plan-quarterly",
}

export default function SubscriptionsPricingSection() {
  const t = useTranslations("subscriptions.plansSection")
  const tPricing = useTranslations("subscriptions.pricing")
  const [plans, setPlans] = useState<SubscriptionPlanConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isActive = true
    const loadPlans = async () => {
      try {
        const { subscription_plans } = await getSubscriptionPlans()
        if (!isActive) return
        setPlans(subscription_plans)
      } catch (error) {
        console.error("Error loading subscription plans:", error)
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadPlans()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const sortedPlans = [...plans]
    .filter((plan) => plan.is_active)
    .sort((a, b) => {
      if (a.sort_order !== b.sort_order) {
        return a.sort_order - b.sort_order
      }
      return a.interval_days - b.interval_days
    })

  return (
    <section ref={sectionRef} className="bg-novapatch-bg-cream py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="type-title font-bold text-novapatch-title">
            {t("title")}
          </h2>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 type-body">{t("loading")}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 type-body">{t("noPlans")}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-6 lg:gap-8">
            {sortedPlans.map((plan, index) => {
              const bgColor = planColors[plan.code] || "bg-novapatch-subscription-plan-monthly"
              const intervalLabel = tPricing("everyDays", { days: plan.interval_days })
              const discountLabel = plan.promotion
                ? plan.promotion.type === "percentage"
                  ? tPricing("discount", { days: plan.interval_days, value: plan.promotion.value })
                  : tPricing("discountAmount", { days: plan.interval_days, value: plan.promotion.value })
                : null
              const shippingLabel =
                plan.free_shipping_threshold === 0
                  ? tPricing("shippingAlwaysFree")
                  : plan.free_shipping_threshold
                  ? tPricing("shippingFreeOver", { amount: plan.free_shipping_threshold })
                  : tPricing("shippingStandard")
              
              return (
                <div
                  key={plan.id}
                  className={`relative w-full max-w-sm md:max-w-none transform transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } md:max-w-[280px]`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`rounded-3xl p-6 h-full transition-all duration-300 relative overflow-hidden ${bgColor} hover:scale-[1.015]`}
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-1">
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                    </div>

                    <h3 className="type-subtitle font-bold text-white mb-2 text-center">
                      {plan.name || plan.code}
                    </h3>
                    
                    <p className="type-body text-white/90 text-center mb-6">
                      {plan.description
                        ? plan.description
                        : discountLabel || intervalLabel}
                    </p>
                    
                    <div className="text-center mb-2">
                      <span className="type-title font-bold text-white">
                        {intervalLabel}
                      </span>
                    </div>

                    <p className="text-center text-white/80 type-body mb-6">{shippingLabel}</p>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="type-body text-white">
                          {tPricing("shippingEvery", { days: plan.interval_days })}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="type-body text-white">{tPricing("cancelAnytime")}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="type-body text-white">{tPricing("modifyEasily")}</span>
                      </li>
                    </ul>
                    
                    <LocalizedClientLink
                      href="/store"
                      className="block w-full bg-[#005088] hover:bg-[#003d6b] text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-200 type-button shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {tPricing("startCta")}
                    </LocalizedClientLink>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
