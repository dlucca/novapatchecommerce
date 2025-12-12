"use client"

import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function SubscriptionsWhySection() {
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
  )
}

