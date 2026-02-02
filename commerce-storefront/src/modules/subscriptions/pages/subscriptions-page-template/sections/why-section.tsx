"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

const whySubscribeItems = [
  {
    icon: "/assets/suscription/ahorro.png",
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
  },
  {
    icon: "/assets/suscription/personalizar-sus.png",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
  },
  {
    icon: "/assets/suscription/garantia.png",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
  },
]

export default function SubscriptionsWhySection() {
  const t = useTranslations("subscriptions.whySubscribe")
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

  return (
    <section ref={sectionRef} className="bg-novapatch-bg-cream pt-24 pb-20 mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="type-title text-novapatch-title">
            ¿Por Qué <span className="font-bold">suscribirse?</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-0">
          {whySubscribeItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-6 md:px-8 lg:px-12 py-4 transform transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                index < whySubscribeItems.length - 1 
                  ? "md:border-r md:border-novapatch-title/20" 
                  : ""
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={t(item.titleKey)}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              
              <h3 className="type-subtitle font-bold text-novapatch-title mb-2">
                {t(item.titleKey)}
              </h3>
              
              <p className="text-gray-600 type-body max-w-[250px] flex-grow">
                {t(item.subtitleKey)}
              </p>
              
              <div className="flex items-center gap-1 mt-4">
                <div className="h-5 w-5 md:h-6 md:w-6 bg-novapatch-subscription-why-circle rounded-full"></div>
                <div className="h-5 w-5 md:h-6 md:w-6 bg-novapatch-subscription-why-circle rounded-full"></div>
                <div className="h-5 w-5 md:h-6 md:w-6 bg-novapatch-subscription-why-circle rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
