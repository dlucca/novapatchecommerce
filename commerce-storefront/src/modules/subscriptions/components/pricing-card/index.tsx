"use client"

import { Heading, Text } from "@medusajs/ui"
import { CheckCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useRef, useState } from "react"
import { SubscriptionPlanConfig } from "@lib/data/subscriptions"

type PricingCardProps = {
  plan: SubscriptionPlanConfig
  isPopular?: boolean
  delay?: number
}

export default function PricingCard({ 
  plan,
  isPopular = false,
  delay = 0 
}: PricingCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`relative transform transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${
        isPopular 
          ? 'border-2 border-novapatch-button rounded-2xl p-8 shadow-2xl md:scale-105 hover:scale-110' 
          : 'border-2 border-gray-200 rounded-2xl p-8 hover:border-novapatch-button hover:shadow-2xl hover:scale-105'
      } transition-all duration-300`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-novapatch-testimonial text-white px-6 py-1 rounded-full text-sm font-semibold animate-pulse">
          Más Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <Heading level="h3" className="text-2xl font-bold text-novapatch-title mb-2">
          {plan.name}
        </Heading>
        <Text className="text-gray-600">
          {plan.promotion 
            ? `Envío cada ${plan.interval_days} días con ${plan.promotion.value}% de descuento`
            : plan.description}
        </Text>
      </div>
      
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-novapatch-button">
          Cada {plan.interval_days} días
        </span>
        <Text className="text-gray-600 mt-2">
          {plan.free_shipping_threshold === null && "Envío estándar"}
          {plan.free_shipping_threshold === 0 && "Envío gratis siempre"}
          {plan.free_shipping_threshold && plan.free_shipping_threshold > 0 && 
            `Envío gratis en pedidos +$${plan.free_shipping_threshold / 100}`}
        </Text>
      </div>
      
      <ul className="space-y-4 mb-8">
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
          <Text className="text-gray-700">Envío cada {plan.interval_days} días</Text>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
          <Text className="text-gray-700">Cancela cuando quieras</Text>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
          <Text className="text-gray-700">Modifica tu pedido fácilmente</Text>
        </li>
        {plan.free_shipping_threshold !== null && (
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <Text className="text-gray-700">
              {plan.free_shipping_threshold === 0 
                ? "Envío gratis incluido" 
                : `Envío gratis en pedidos +$${plan.free_shipping_threshold / 100}`}
            </Text>
          </li>
        )}
      </ul>
      
      <LocalizedClientLink
        href="/store"
        className="block w-full bg-novapatch-button hover:bg-novapatch-footer text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
      >
        Comenzar
      </LocalizedClientLink>
    </div>
  )
}

