"use client"

import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect } from "react"

// Íconos de características
const productFeatures = [
  {
    src: "/assets/features/not_sugar-cropped.svg",
    alt: "Sin azúcar",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/vegan-cropped.svg",
    alt: "100% vegano",
    width: 75,
    height: 75,
  },
  {
    src: "/assets/features/gluten_free-cropped.svg",
    alt: "Libre de gluten",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/water_proo-cropped.svg",
    alt: "Resistente al agua",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/latex-free.svg",
    alt: "Sin látex",
    width: 60,
    height: 60,
  },
  {
    src: "/assets/features/minutes-cropped.svg",
    alt: "Efecto en minutos",
    width: 60,
    height: 60,
  },
]

// Slides del carrusel con textos personalizados
const heroSlides = [
  {
    image: "/assets/hero/Energy.webp",
    title: "Qué bien",
    titleLine2: "se siente",
    titleLine3: "sentirse bien.",
    highlightedWord: "bien",
    waveColor: "#5686BC", // Energy
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
  {
    image: "/assets/hero/Glow.webp",
    title: "Juventud",
    titleLine2: "radiante",
    titleLine3: "al instante.",
    highlightedWord: "instante",
    waveColor: "#f35c55", // Glow
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
  {
    image: "/assets/hero/Shield.webp",
    title: "Súmale un",
    titleLine2: "plus único",
    titleLine3: "a tu día a día.",
    highlightedWord: "día a día",
    waveColor: "#FFA849", // Shield
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
  {
    image: "/assets/hero/Sleep.webp",
    title: "Descanso",
    titleLine2: "profundo",
    titleLine3: "asegurado.",
    highlightedWord: "asegurado",
    waveColor: "#1EB1BB", // Sleep
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
  {
    image: "/assets/hero/Woman.webp",
    title: "Equilibrio",
    titleLine2: "hormonal",
    titleLine3: "al natural.",
    highlightedWord: "natural",
    waveColor: "#C89EC6", // Woman
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
  {
    image: "/assets/hero/Zen.webp",
    title: "Tu mente",
    titleLine2: "en calma",
    titleLine3: "inmediata.",
    highlightedWord: "inmediata",
    waveColor: "#4E82BC", // Zen
    subtitle: "Activa tu bienestar natural",
    link: "/store",
  },
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-advance carousel every 8 seconds (más lento)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setIsTransitioning(false)
      }, 800)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  // Función para ir al slide anterior
  const goToPrevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      setIsTransitioning(false)
    }, 800)
  }

  // Función para ir al siguiente slide
  const goToNextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      setIsTransitioning(false)
    }, 800)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative overflow-visible h-screen min-h-[600px]">
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent w-full sm:w-[85%] md:w-[65%] lg:w-[58%] xl:w-[52%]"></div>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Slide siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center pt-32 xsmall:pt-40 md:pt-0">
        <div className="w-full px-8 xsmall:px-12 sm:px-16 md:px-24 lg:px-32 xl:px-40">
          <div className="max-w-2xl">
            <h1
              className={`text-white font-bold leading-[1.05] text-[clamp(2.75rem,4.5vw+0.5rem,4.25rem)] mb-[clamp(1rem,2vw,1.5rem)] transition-opacity duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {currentSlideData.title} <br />
              {currentSlideData.titleLine2} <br />
              <span className="relative inline-block">
                {currentSlideData.titleLine3.split(currentSlideData.highlightedWord)[0]}
                <span 
                  className="text-white px-2 transition-colors duration-[2000ms]"
                  style={{ backgroundColor: currentSlideData.waveColor }}
                >
                  {currentSlideData.highlightedWord}
                </span>
                {currentSlideData.titleLine3.split(currentSlideData.highlightedWord)[1]}
              </span>
            </h1>

            <p
              className={`text-white font-light leading-relaxed text-[clamp(1rem,1.5vw+0.5rem,1.375rem)] mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,50vw,500px)] transition-opacity duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
            >
              {currentSlideData.subtitle}
            </p>

            <LocalizedClientLink href={currentSlideData.link}>
              <button className="bg-novapatch-button text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.625rem,1vw,0.75rem)] text-[clamp(0.875rem,1vw,1rem)]">
                Comprar ahora
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 w-full z-30 overflow-visible h-40"
        style={{ bottom: "clamp(-12rem, -3rem - 2vw, -8rem)" }}
      >
        <svg width="100%" height="100%" fill={currentSlideData.waveColor}>
          <defs>
            <mask id="hole">
              <rect width="100%" height="100%" fill="white" />
              <svg width="170" x="87%">
                <circle r="25" cx={25} cy="0%" fill="black" />
                <circle r="25" cx={75+10} cy="0%" fill="black" />
                <circle r="25" cx={125+20} cy="0%" fill="black" />
              </svg>
            </mask>
          </defs>

          <rect id="donut" width="100%" height="100%" mask="url(#hole)" />

        </svg>

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
            {/* Grid de 2 filas en móvil, 1 fila en desktop */}
            <div className="grid grid-cols-3 md:flex md:flex-row md:justify-center gap-x-3 gap-y-4 xsmall:gap-x-4 xsmall:gap-y-5 md:gap-x-10 lg:gap-x-12 xl:gap-x-16">
              {productFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-120"
                >
                  <div className="flex items-center justify-center h-[clamp(48px,6vw,64px)] w-[clamp(48px,6vw,64px)]">
                    <Image
                      src={feature.src}
                      alt={feature.alt}
                      width={feature.width}
                      height={feature.height}
                      style={{ objectFit: "contain" }}
                      className="filter brightness-0 invert w-full h-full"
                    />
                  </div>
                  <p className="text-white font-bold text-[clamp(9px,1.1vw,11px)] text-center mt-1 leading-tight max-w-[80px]">
                    {feature.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
