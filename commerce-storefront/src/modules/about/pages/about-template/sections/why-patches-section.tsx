"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const whyPatchesItems = [
  {
    icon: "/assets/about/sin-rellenos.png",
    titleKey: "noFillers.title",
    descKey: "noFillers.description",
    bgColor: "#E5CAE4",
  },
  {
    icon: "/assets/about/vegano.png",
    titleKey: "vegan.title",
    descKey: "vegan.description",
    bgColor: "#B3DBDD",
  },
  {
    icon: "/assets/about/gluten-free.png",
    titleKey: "glutenFree.title",
    descKey: "glutenFree.description",
    bgColor: "#EEBCBC",
  },
  {
    icon: "/assets/about/rapida.png",
    titleKey: "fastAction.title",
    descKey: "fastAction.description",
    bgColor: "#BBD6EC",
  },
]

export default function AboutWhyPatchesSection() {
  const t = useTranslations("about.whyPatches")
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
    <section ref={sectionRef} className="bg-[#FEF7ED] pt-24 pb-20 mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="type-title text-novapatch-title mb-6">
              {t.rich("title", {
                highlight: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </h2>
            <p className="text-gray-700 type-body mb-4">
              {t("paragraph1")}
            </p>
            <p className="text-gray-700 type-body font-semibold mb-4">
              {t("paragraph2")}
            </p>
            <p className="text-gray-700 type-body">
              {t("paragraph3")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {whyPatchesItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 text-center transform transition-all duration-700 relative flex flex-col items-center justify-center min-h-[180px] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ 
                  backgroundColor: item.bgColor,
                  transitionDelay: `${index * 150}ms` 
                }}
              >
                <div className="flex items-center justify-center mb-3">
                  <Image
                    src={item.icon}
                    alt={t(item.titleKey)}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold type-body">
                  {t(item.titleKey)}
                </h3>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#FEF7ED]"></div>
                  <div className="w-8 h-8 rounded-full bg-[#FEF7ED]"></div>
                  <div className="w-8 h-8 rounded-full bg-[#FEF7ED]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
