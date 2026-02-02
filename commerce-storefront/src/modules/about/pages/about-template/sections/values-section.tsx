"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const valuesItems = [
  {
    icon: "/assets/about/premium.png",
    titleKey: "quality.title",
    descKey: "quality.description",
  },
  {
    icon: "/assets/about/sostenibilidad.png",
    titleKey: "sustainability.title",
    descKey: "sustainability.description",
  },
  {
    icon: "/assets/about/comunidad.png",
    titleKey: "community.title",
    descKey: "community.description",
  },
  {
    icon: "/assets/about/innovacion.png",
    titleKey: "innovation.title",
    descKey: "innovation.description",
  },
  {
    icon: "/assets/about/transparencia.png",
    titleKey: "transparency.title",
    descKey: "transparency.description",
  },
  {
    icon: "/assets/about/seguridad.png",
    titleKey: "safety.title",
    descKey: "safety.description",
  },
]

export default function AboutValuesSection() {
  const t = useTranslations("about.values")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
    <section ref={sectionRef} className="bg-[#FEF7ED] py-20 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="type-title text-novapatch-title">
            {t("title")}
          </h2>
        </div>
      </div>

      <div className="bg-[#B3DBDD] py-16 relative overflow-hidden">
        <div className="absolute -top-4 left-5 flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full mr-1"></div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full mr-1"></div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full"></div>
        </div>

        <div className="absolute -top-10 -right-10 z-10">
          <Image
            src="/assets/features/flower.svg"
            alt="Decoración floral"
            width={200}
            height={200}
            className="opacity-70"
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {valuesItems.map((item, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={item.icon}
                    alt={t(item.titleKey)}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="type-subtitle font-bold text-novapatch-title mb-3">
                  {t(item.titleKey)}
                </h3>
                <p className="text-novapatch-title type-body">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-4 right-5 flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full mr-1"></div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full mr-1"></div>
          <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FEF7ED] rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
