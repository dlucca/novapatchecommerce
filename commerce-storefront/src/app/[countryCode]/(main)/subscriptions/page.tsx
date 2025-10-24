"use client"

import { Heading, Text } from "@medusajs/ui"
import { CheckCircle } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FAQSection from "@modules/home/components/faq-section"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// Componente para las cards de planes con animación
function PricingCard({ 
  title, 
  subtitle, 
  discount, 
  features, 
  isPopular = false,
  delay = 0 
}: { 
  title: string
  subtitle: string
  discount: string
  features: string[]
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
          {title}
        </Heading>
        <Text className="text-gray-600">{subtitle}</Text>
      </div>
      
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-novapatch-button">{discount}</span>
        <Text className="text-gray-600 mt-2">de descuento</Text>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <Text className="text-gray-700">{feature}</Text>
          </li>
        ))}
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-novapatch-bg-light via-blue-50 to-novapatch-bg-cream min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Agregar imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero/Girls.svg"
            alt="Mujeres disfrutando con Novapatch"
            fill
            style={{ objectFit: "cover", objectPosition: "65% center" }}
            priority
          />
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent w-full sm:w-[85%] md:w-[65%] lg:w-[58%] xl:w-[52%]"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <Heading level="h1" className="text-5xl md:text-6xl lg:text-7xl font-bold text-novapatch-title mb-8">
            Tu Rutina de Bienestar Comienza Aquí
          </Heading>
          <Text className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
            Personaliza una suscripción que funcione para ti y ahorra en cada pedido.
          </Text>
          <LocalizedClientLink
            href="/store"
            className="inline-block bg-novapatch-button hover:bg-novapatch-footer text-white px-10 py-5 rounded-full font-semibold text-xl transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105"
          >
            {/* TODO: Cambiar el texto */}
            Suscríbete y Ahorra 20%
          </LocalizedClientLink>
        </div>
      </div>

      {/* Why It's Great Section - Sticky Scroll */}
      <div className="relative">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Mensual"
            subtitle="Perfecto para comenzar"
            discount="15%"
            features={[
              "Envío cada 30 días",
              "Cancela cuando quieras",
              "Modifica tu pedido fácilmente"
            ]}
            delay={0}
          />

          <PricingCard
            title="Bimestral"
            subtitle="El favorito de nuestros clientes"
            discount="20%"
            features={[
              "Envío cada 60 días",
              "Mayor ahorro por pedido",
              "Envío gratis en pedidos +$50"
            ]}
            isPopular={true}
            delay={200}
          />

          <PricingCard
            title="Trimestral"
            subtitle="Máximo ahorro"
            discount="25%"
            features={[
              "Envío cada 90 días",
              "El mejor precio garantizado",
              "Envío gratis siempre"
            ]}
            delay={400}
          />
        </div>
      </div>

      <FAQSection />
      </div>
  )
}
