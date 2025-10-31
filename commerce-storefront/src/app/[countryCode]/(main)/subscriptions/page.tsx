"use client"

import { Heading, Text } from "@medusajs/ui"
import { CheckCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FAQSection from "@modules/home/components/faq-section"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getSubscriptionPlans, SubscriptionPlanConfig } from "@lib/data/subscriptions"

// Componente para las cards de planes con animación
function PricingCard({ 
  plan,
  isPopular = false,
  delay = 0 
}: { 
  plan: SubscriptionPlanConfig
  isPopular?: boolean
  delay?: number
}) {
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
        <Text className="text-gray-600">{plan.description}</Text>
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

export default function SubscriptionsPage() {
  const [titleVisible, setTitleVisible] = useState(false)
  const [plans, setPlans] = useState<SubscriptionPlanConfig[]>([])
  const [loading, setLoading] = useState(true)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTitleVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current)
      }
    }
  }, [])

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await getSubscriptionPlans()
        setPlans(data.subscription_plans)
      } catch (error) {
        console.error("Error loading subscription plans:", error)
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [])

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Copiado del inicio */}
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
                Tu Rutina de <br />
                Bienestar Comienza <br />
                Aquí
              </h1>

              <p className="text-black font-extralight leading-relaxed text-[clamp(1rem,1.5vw+0.5rem,1.375rem)] mb-[clamp(1.5rem,2vw,2rem)] max-w-[clamp(280px,50vw,500px)]">
                Personaliza una suscripción que funcione para ti y ahorra en cada pedido.
              </p>

              <LocalizedClientLink href="/store">
                <button className="bg-novapatch-button text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity px-[clamp(1.5rem,2vw,2rem)] py-[clamp(0.625rem,1vw,0.75rem)] text-[clamp(0.875rem,1vw,1rem)]">
                  Suscríbete y ahorra
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
        </div>
      </section>

      {/* Why It's Great Section - Sticky Scroll */}
      <div className="relative" style={{ marginTop: 'clamp(8rem, 10vw, 12rem)' }}>
        {/* Slide 1 - Con imagen de fondo */}
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/hero/Girls.svg"
              alt="Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-novapatch-bg-light/95 via-white/90 to-novapatch-bg-cream/95 z-0" />
          
          {/* Contenido */}
          <div className="relative z-10 max-w-3xl px-8 text-center py-20">
            <div 
              ref={titleRef}
              className={`transform transition-all duration-700 mb-12 ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-5'
              }`}
            >
              <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-4">
                ¿Por Qué Suscribirse?
              </Heading>
            </div>

            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mx-auto mb-10 overflow-hidden shadow-2xl border-4 border-novapatch-button/30">
              <Image
                src="/assets/suscription/ahorrar-dinero.gif"
                alt="Ahorra más"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <Heading level="h2" className="text-5xl md:text-6xl font-bold text-novapatch-title mb-8">
              Ahorra más
            </Heading>
            <Text className="text-2xl text-gray-700 leading-relaxed mb-12">
              Ahorra más con cada caja y nunca te preocupes por quedarte sin parches.
            </Text>
            
            {/* Indicador de scroll */}
            <div className="flex flex-col items-center mt-16 animate-bounce">
              <Text className="text-sm font-semibold text-novapatch-button mb-2">Desliza para ver más</Text>
              <svg className="w-8 h-8 text-novapatch-button" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-novapatch-title/5 via-novapatch-bg-light to-white py-20">
          <div className="max-w-3xl px-8 text-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mx-auto mb-10 overflow-hidden shadow-2xl border-4 border-novapatch-primary/40">
              <Image
                src="/assets/suscription/redes-sociales.gif"
                alt="Personaliza tu suscripción"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <Heading level="h2" className="text-5xl md:text-6xl font-bold text-novapatch-title mb-8">
              Personaliza tu suscripción
            </Heading>
            <Text className="text-2xl text-gray-700 leading-relaxed">
              Pausa, omite, cambia o cancela tu suscripción en cualquier momento.
            </Text>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-novapatch-bg-cream via-novapatch-bg-light to-white py-20">
          <div className="max-w-3xl px-8 text-center">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mx-auto mb-10 overflow-hidden shadow-2xl border-4 border-novapatch-testimonial/40">
              <Image
                src="/assets/suscription/blindaje.gif"
                alt="Garantía de 30 Días"
                width={180}
                height={180}
                className="object-contain"
              />
            </div>
            <Heading level="h2" className="text-5xl md:text-6xl font-bold text-novapatch-title mb-8">
              Garantía de 30 Días
            </Heading>
            <Text className="text-2xl text-gray-700 leading-relaxed">
              Creemos que te encantará NovaPatch. Si no es así, estás cubierto.
            </Text>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-novapatch-bg-light py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
            ¿Cómo Suscribirte?
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                1
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                Elige tus Parches
              </Heading>
              <Text className="text-gray-600">
                Navega por nuestra tienda y selecciona los parches que necesitas.
              </Text>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                2
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                Selecciona Suscripción
              </Heading>
              <Text className="text-gray-600">
                Elige la opción "Suscribirse y Ahorrar" al agregar al carrito.
              </Text>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                3
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                Elige Frecuencia
              </Heading>
              <Text className="text-gray-600">
                Selecciona cada cuánto quieres recibir tus parches.
              </Text>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                4
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
                Recibe y Disfruta
              </Heading>
              <Text className="text-gray-600">
                Tus parches llegarán antes de que se te acaben.
              </Text>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <Text className="text-gray-700 text-lg leading-relaxed">
              La próxima vez que compres en novapatch.com, selecciona la opción <span className="font-semibold text-novapatch-button">Suscribirse y Ahorrar</span>, 
              luego agrégalo al carrito. ¡Mira esos ahorros instantáneos! Elige tu calendario de entrega y tus parches 
              llegarán antes de que se te acaben.
            </Text>
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
          Planes de Suscripción
        </Heading>
        
        {loading ? (
          <div className="text-center py-12">
            <Text className="text-gray-600">Cargando planes...</Text>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12">
            <Text className="text-gray-600">No hay planes disponibles en este momento.</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isPopular={plan.code === "bimonthly"}
                delay={index * 200}
              />
            ))}
          </div>
        )}
      </div>

      <FAQSection />
      </div>
  )
}
