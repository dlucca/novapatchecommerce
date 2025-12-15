"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const productFeaturesConfig = [
  {
    src: "/assets/features/not_sugar-cropped.svg",
    key: "sugarFree",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/vegan-cropped.svg",
    key: "vegan",
    width: 75,
    height: 75,
  },
  {
    src: "/assets/features/gluten_free-cropped.svg",
    key: "glutenFree",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/water_proo-cropped.svg",
    key: "waterResistant",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/latex-free.svg",
    key: "latexFree",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/minutes-cropped.svg",
    key: "fastEffect",
    width: 60,
    height: 60,
  },
]

export default function SubscriptionsHeroSection() {
  const t = useTranslations("subscriptions.hero")
  const tFeatures = useTranslations("features")
  return (
    <section className="relative overflow-visible h-screen min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero/Girls.svg"
          alt="Mujeres disfrutando con Novapatch"
          fill
          style={{ objectFit: "cover", objectPosition: "65% center" }}
          priority
        />
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent w-full sm:w-[85%] md:w-[65%] lg:w-[58%] xl:w-[52%]"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center pt-32 xsmall:pt-40 md:pt-0">
        <div className="w-full px-8 xsmall:px-12 sm:px-16 md:px-24 lg:px-32 xl:px-40">
          <div className="max-w-2xl">
            <h1 className="text-novapatch-title font-normal leading-[1.05] text-[clamp(2.75rem,4.5vw+0.5rem,4.25rem)] mb-[clamp(1rem,2vw,1.5rem)]">
              {t("title")}
            </h1>

            <p className="text-black font-extralight leading-relaxed text-[clamp(1rem,1.5vw+0.5rem,1.375rem)] mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,50vw,500px)]">
              {t("subtitle")}
            </p>

            <LocalizedClientLink href="/store">
              <button className="bg-novapatch-button text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.625rem,1vw,0.75rem)] text-[clamp(0.875rem,1vw,1rem)]">
                {t("cta")}
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 w-full z-30 overflow-visible"
        style={{ bottom: "clamp(-8rem, -2rem - 2vw, -6rem)" }}
      >
        <div
          className="w-full bg-[#83b5f4]"
          style={{ height: "clamp(10rem, 8rem + 2vw, 12rem)" }}
        >
          <div className="absolute left-0 right-0 w-full z-40 top-1/2 -translate-y-1/2 overflow-visible">
            <div className="absolute left-[8%] bottom-[25%] z-10 hidden md:block">
              <Image
                src="/assets/features/flower.svg"
                alt="Decoración floral"
                width={60}
                height={60}
                className="w-[clamp(50px,6vw,80px)] h-[clamp(50px,6vw,80px)]"
                style={{ opacity: 0.5 }}
              />
            </div>

            <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8 z-50">
              <div className="grid grid-cols-3 md:flex md:flex-row md:justify-center gap-x-3 gap-y-4 xsmall:gap-x-4 xsmall:gap-y-5 md:gap-x-10 lg:gap-x-12 xl:gap-x-16">
                {productFeaturesConfig.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-120"
                  >
                    <div className="flex items-center justify-center h-[clamp(48px,6vw,64px)] w-[clamp(48px,6vw,64px)]">
                      <Image
                        src={feature.src}
                        alt={tFeatures(feature.key)}
                        width={feature.width}
                        height={feature.height}
                        style={{ objectFit: "contain" }}
                        className="filter brightness-0 invert w-full h-full"
                      />
                    </div>
                    <p className="text-white font-bold text-[clamp(9px,1.1vw,11px)] text-center mt-1 leading-tight max-w-[80px]">
                      {tFeatures(feature.key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

