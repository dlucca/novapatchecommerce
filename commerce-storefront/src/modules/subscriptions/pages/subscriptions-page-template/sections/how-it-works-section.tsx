"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"

const stepColors = [
  "bg-novapatch-subscription-how-step-1",
  "bg-novapatch-subscription-how-step-2", 
  "bg-novapatch-subscription-how-step-3",
  "bg-novapatch-subscription-how-step-4",
]

export default function SubscriptionsHowItWorksSection() {
  const t = useTranslations("subscriptions.howItWorks")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps = [
    { number: 1, titleKey: "step1Title", descKey: "step1Description" },
    { number: 2, titleKey: "step2Title", descKey: "step2Description" },
    { number: 3, titleKey: "step3Title", descKey: "step3Description" },
    { number: 4, titleKey: "step4Title", descKey: "step4Description" },
  ]

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
    <section ref={sectionRef} className="bg-novapatch-subscription-why-circle py-20 relative overflow-hidden">
      <div className="absolute -top-4 left-5 flex items-center">
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full mr-1"></div>
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full mr-1"></div>
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="type-title text-novapatch-title">
            {t.rich("title", {
              highlight: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
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
                className={`rounded-3xl p-5 md:p-6 pl-8 md:pl-10 h-full relative overflow-hidden ${stepColors[index]}`}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-1">
                  <div className="w-9 h-9 rounded-full bg-novapatch-subscription-why-circle"></div>
                  <div className="w-9 h-9 rounded-full bg-novapatch-subscription-why-circle"></div>
                  <div className="w-9 h-9 rounded-full bg-novapatch-subscription-why-circle"></div>
                </div>

                <div className="mb-3">
                  <span className="text-5xl md:text-6xl font-bold leading-none text-white opacity-80">
                    {step.number}
                  </span>
                </div>
                <h3 className="type-subtitle font-bold mb-2 text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="type-body text-white/90">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-novapatch-title type-body text-center max-w-4xl mx-auto">
          {t("finalNote")}{" "}
          <span className="font-bold">{t("finalNoteHighlight")}</span>
          {t("finalNoteEnd")}
        </p>
      </div>

      <div className="absolute -bottom-4 right-5 flex items-center">
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full mr-1"></div>
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full mr-1"></div>
        <div className="h-8 w-8 md:h-10 md:w-10 bg-novapatch-bg-cream rounded-full"></div>
      </div>
    </section>
  )
}
