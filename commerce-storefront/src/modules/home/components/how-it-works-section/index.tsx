"use client"

import Image from "next/image"
import { useTranslations } from 'next-intl'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HowItWorksSection = () => {
  const t = useTranslations('howItWorks')

  return (
    <section className="bg-white" style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}>
      <div className="max-w-7xl mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <div className="flex flex-col lg:flex-row items-center justify-center" style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}>
          
          <div className="flex-1 text-center lg:text-left w-full order-1 lg:order-2">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2
                className="font-bold leading-tight text-novapatch-title"
                style={{ color: "#3d6a96" }}
              >
                {t('title')}
              </h2>

              <p
                className="font-medium text-novapatch-title"
                style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.25rem, 1.25rem)', marginBottom: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}
              >
                {t('subtitle')}
              </p>

              <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', marginBottom: 'clamp(1.75rem, 2vw, 2rem)' }}>
                {t('description')}
              </p>

              <div className="text-center lg:text-left">
                <LocalizedClientLink href="/about-patches">
                  <button
                    className="text-white font-medium rounded-lg transition-colors duration-200 hover:opacity-90 shadow-md bg-novapatch-button"
                    style={{ padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)', fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
                  >
                    {t('cta')}
                  </button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center w-full order-2 lg:order-1">
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <Image
                src="/assets/work/howwork.webp"
                alt={t('subtitle')}
                width={500}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
