"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from 'next-intl'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ProductPatchesSection = () => {
  const t = useTranslations('section2')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset animación cuando sale del viewport
          setIsVisible(false)
        }
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

  const products = [
    {
      className: "nova-product-teal",
      letter: "S",
      img: "/assets/products/DeepRest-Patch.webp",
    },
    {
      className: "nova-product-blue",
      letter: "Z",
      img: "/assets/products/ZenCore-Patch.webp",
    },
    {
      className: "nova-product-red",
      letter: "G",
      img: "/assets/products/Glow-Patch.webp",
    },
    {
      className: "nova-product-yellow",
      letter: "S",
      img: "/assets/products/Daily-shield-Patch.webp",
    },
    {
      className: "nova-product-purple",
      letter: "E",
      img: "/assets/products/Energy-Patch.webp",
    },
    {
      className: "nova-product-pink",
      letter: "W",
      img: "/assets/products/Woman-Patch.webp",
    },
  ]

  return (
    <section className="relative overflow-visible w-full" style={{ marginTop: 'clamp(8rem, 10vw, 11rem)', marginBottom: 'clamp(3rem, 4vw, 4rem)' }}>
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[clamp(280px,35vh,320px)]">
          <div
            className="w-full md:w-1/2 flex items-center justify-start rounded-t-[30px] md:rounded-t-none md:rounded-tr-[50px] bg-novapatch-bg-light"
            style={{ padding: 'clamp(2rem, 2.5vw, 2.5rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 2.5vw, 2.5rem) clamp(4rem, 12vw, 12rem)' }}
          >
            <div className="w-full">
              <h2
                className="font-normal leading-tight text-novapatch-title"
                style={{ marginBottom: 'clamp(1rem, 1.25vw, 1.25rem)' }}
              >
                {t('title.line1')} <span className="font-bold">{t('title.line1Bold')}</span> {t('title.line1End')}
                <br className="hidden sm:block" />
                {t('title.line2')} <span className="font-bold">{t('title.line2Bold')}</span>
              </h2>

              <p className="text-gray-700 max-w-md" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', marginBottom: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>
                {t('description')}
              </p>
              <LocalizedClientLink href="/store">
                <button
                  className="text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity bg-novapatch-button"
                  style={{ padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)', fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}
                >
                  {t('cta')}
                </button>
              </LocalizedClientLink>
            </div>
          </div>

          <div
            className="hidden md:block h-full w-1/2 relative bg-novapatch-bg-light"
          >
            <div
              className="h-full w-full bg-white rounded-bl-[clamp(100px,12vw,120px)]"
            ></div>
          </div>
        </div>

        <div
          className="w-full relative rounded-b-[30px] md:rounded-br-none rounded-bl-[clamp(80px,10vw,120px)] bg-novapatch-bg-light"
          style={{ paddingTop: 'clamp(2rem, 2.5vw, 2.5rem)', paddingBottom: 'clamp(2.5rem, 3.5vw, 3.5rem)' }}
        >
          <div className="absolute flex items-center z-10" style={{ top: 'clamp(-1rem, -1.25vw, -1.25rem)', right: 'clamp(0.75rem, 1vw, 1rem)' }}>
            <div className="h-[clamp(24px,2vw,36px)] w-[clamp(24px,2vw,36px)] bg-white rounded-full mr-1"></div>
            <div className="h-[clamp(24px,2vw,36px)] w-[clamp(24px,2vw,36px)] bg-white rounded-full mr-1"></div>
            <div className="h-[clamp(24px,2vw,36px)] w-[clamp(24px,2vw,36px)] bg-white rounded-full"></div>
          </div>

          <div className="w-full" style={{ paddingLeft: 'clamp(1rem, 5vw, 5rem)', paddingRight: 'clamp(1rem, 5vw, 5rem)' }} ref={sectionRef}>
            <div className="flex justify-center items-center overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
              <div className="flex justify-center items-center min-w-max md:min-w-0">
                {products.map((product, index) => {
                  const stackOrder = products.length - index
                  const isEven = index % 2 === 0

                  return (
                    <div
                      key={index}
                      className={`relative transition-all duration-1000 ease-out ${isVisible
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                        } ${index === 0 ? '' : '-ml-[45px] sm:-ml-[35px] md:-ml-[35px] lg:-ml-[40px]'
                        } ${isEven ? 'mt-0' : 'mt-[30px] sm:mt-[40px] md:mt-[50px] lg:mt-[60px]'
                        }`}
                      style={{
                        zIndex: stackOrder,
                        transitionDelay: `${index * 150}ms`
                      }}
                    >
                      <div className="overflow-hidden">
                        <Image
                          src={product.img}
                          alt={`Novapatch ${product.letter}`}
                          width={200}
                          height={200}
                          className="w-24 sm:w-28 md:w-32 lg:w-40 xl:w-48 h-auto object-cover"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPatchesSection
