"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const stepColors = [
  "#82B5F3",
  "#4E82BC", 
  "#005088",
]

export default function AboutHowToUseSection() {
  const t = useTranslations("about.howToUse")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps = [
    { number: 1, titleKey: "step1.title", descKey: "step1.description" },
    { number: 2, titleKey: "step2.title", descKey: "step2.description" },
    { number: 3, titleKey: "step3.title", descKey: "step3.description" },
  ]

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
    <section ref={sectionRef} className="bg-[#FEF7ED] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="leading-tight text-novapatch-title">
            ¡Solo despega, pega y <span className="font-bold">disfruta!</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? "opacity-100 translate-y-0 scale-100" 
                  : "opacity-0 translate-y-12 scale-95"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div 
                className="rounded-3xl p-6 pl-10 h-full relative overflow-hidden flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: stepColors[index] }}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-1">
                  <div className="w-9 h-9 rounded-full bg-[#FEF7ED]"></div>
                  <div className="w-9 h-9 rounded-full bg-[#FEF7ED]"></div>
                  <div className="w-9 h-9 rounded-full bg-[#FEF7ED]"></div>
                </div>

                <div className="mb-3">
                  <span className="text-6xl font-bold leading-none text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-white">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
