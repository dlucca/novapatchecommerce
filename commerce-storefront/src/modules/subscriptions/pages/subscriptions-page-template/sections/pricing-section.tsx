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

const planLabels: Record<string, string> = {
  monthly: "Plan mensual",
  bimonthly: "Plan bimestral",
  quarterly: "Plan trimestral",
}

const planDays: Record<string, string> = {
  monthly: "Cada 30 días",
  bimonthly: "Cada 60 días",
  quarterly: "Cada 90 días",
}

export default function SubscriptionsPricingSection() {
  const t = useTranslations("subscriptions.plansSection")
  const [plans] = useState<SubscriptionPlanConfig[]>([
    {
      id: '1',
      code: 'monthly',
      name: 'Plan Mensual',
      interval_days: 30,
      free_shipping_threshold: null,
      description: 'Recibe tus parches cada 30 días',
      promotion_code: 'SUB_MONTHLY',
      is_active: true,
      sort_order: 1,
      promotion: null
    },
    {
      id: '2',
      code: 'bimonthly',
      name: 'Plan Bimestral',
      interval_days: 60,
      free_shipping_threshold: 0,
      description: 'Recibe tus parches cada 60 días',
      promotion_code: 'SUB_BIMONTHLY',
      is_active: true,
      sort_order: 2,
      promotion: {
        id: 'promo1',
        code: 'SUB_BIMONTHLY',
        type: 'percentage',
        value: 10,
        is_automatic: true,
        status: 'active'
      }
    },
    {
      id: '3',
      code: 'quarterly',
      name: 'Plan Trimestral',
      interval_days: 90,
      free_shipping_threshold: 0,
      description: 'Recibe tus parches cada 90 días',
      promotion_code: 'SUB_QUARTERLY',
      is_active: true,
      sort_order: 3,
      promotion: {
        id: 'promo2',
        code: 'SUB_QUARTERLY',
        type: 'percentage',
        value: 15,
        is_automatic: true,
        status: 'active'
      }
    }
  ])
  const [loading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const sortedPlans = [...plans].sort((a, b) => a.interval_days - b.interval_days)

  return (
    <section ref={sectionRef} className="bg-novapatch-bg-cream py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold leading-tight text-novapatch-title">
            {t("title")}
          </h2>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t("loading")}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t("noPlans")}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-6 lg:gap-8">
            {sortedPlans.map((plan, index) => {
              const isPopular = plan.code === "bimonthly"
              const bgColor = planColors[plan.code] || "bg-novapatch-subscription-plan-monthly"
              
              return (
                <div
                  key={plan.id}
                  className={`relative w-full max-w-sm md:max-w-none transform transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } ${isPopular ? "md:scale-110 md:z-10" : "md:max-w-[280px]"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-yellow-400 text-novapatch-title text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                        Más popular
                      </span>
                    </div>
                  )}
                  
                  <div 
                    className={`rounded-3xl p-6 h-full transition-all duration-300 relative overflow-hidden ${bgColor}`}
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-1">
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                      <div className="w-9 h-9 rounded-full bg-novapatch-bg-cream"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      {planLabels[plan.code] || plan.name}
                    </h3>
                    
                    <p className="text-sm text-white/90 text-center mb-6">
                      {plan.promotion 
                        ? `Envío cada ${plan.interval_days} días con ${plan.promotion.value}% de descuento`
                        : `Envío cada ${plan.interval_days} días`}
                    </p>
                    
                    <div className="text-center mb-2">
                      <span className="text-3xl font-bold text-white">
                        {planDays[plan.code] || `Cada ${plan.interval_days} días`}
                      </span>
                    </div>

                    <p className="text-center text-white/80 text-sm mb-6">Envío estándar</p>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Envío cada {plan.interval_days} días</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Cancela cuando quieras</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white">Modifica tu pedido</span>
                      </li>
                    </ul>
                    
                    <LocalizedClientLink
                      href="/store"
                      className="block w-full bg-[#005088] hover:bg-[#003d6b] text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-200"
                    >
                      Comenzar
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

