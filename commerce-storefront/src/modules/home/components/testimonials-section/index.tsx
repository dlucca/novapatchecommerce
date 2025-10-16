"use client"

import { useState } from "react"
import Image from "next/image"

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      stars: 5,
      text: "Usé el de energía por la mañana y el de sueño en la noche. ¡Una maravilla!",
      image: "/assets/testimonials/woman3.svg"
    },
    {
      stars: 5,
      text: "¡Me salvan en el trabajo! Me siento con energía y súper concentrada.",
      image: "/assets/testimonials/woman-2.svg"
    },
    {
      stars: 5,
      text: "Estoy fascinada. ¡El parche de inmunidad diaria es mi favorito!",
      image: "/assets/testimonials/woman-1.svg"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const StarRating = ({ stars }: { stars: number }) => (
    <div className="flex justify-center text-white" style={{ marginBottom: 'clamp(0.75rem, 1vw, 1rem)' }}>
      {Array(stars).fill(0).map((_, i) => (
        <svg key={i} className="w-[clamp(24px,2.5vw,28px)] h-[clamp(24px,2.5vw,28px)]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section className="bg-novapatch-testimonial relative overflow-hidden" style={{ paddingTop: 'clamp(3rem, 4vw, 4rem)', paddingBottom: 'clamp(3rem, 4vw, 4rem)' }}>
      {/* Círculos decorativos blancos */}
      <div className="absolute -top-7 left-5 flex items-center">
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full"></div>
      </div>
      <div className="absolute -bottom-7 right-5 flex items-center">
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
        <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute top-1/2 transform -translate-y-1/2 z-20 w-[clamp(40px,4vw,48px)] h-[clamp(40px,4vw,48px)] bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-200"
            style={{ left: 'clamp(0.5rem, 1vw, 1rem)' }}
            aria-label="Anterior testimonio"
          >
            <svg className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 z-20 w-[clamp(40px,4vw,48px)] h-[clamp(40px,4vw,48px)] bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-200"
            style={{ right: 'clamp(0.5rem, 1vw, 1rem)' }}
            aria-label="Siguiente testimonio"
          >
            <svg className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(1.5rem, 2vw, 2rem)', paddingLeft: 'clamp(1rem, 4vw, 4rem)', paddingRight: 'clamp(1rem, 4vw, 4rem)' }}>
                    {/* Mostrar 3 testimonios en desktop, 1 en mobile */}
                    {Array.from({ length: 3 }).map((_, cardIndex) => {
                      const testimonialIndex = (currentSlide + cardIndex) % testimonials.length
                      const currentTestimonial = testimonials[testimonialIndex]

                      return (
                        <div key={cardIndex} className={`text-center ${cardIndex > 0 ? 'hidden md:block' : ''}`}>
                          {/* Imagen - Fluid */}
                          <div style={{ marginBottom: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}>
                            <div className="w-[clamp(176px,20vw,224px)] h-[clamp(176px,20vw,224px)] mx-auto overflow-hidden bg-gray-200 shadow-lg" style={{ borderRadius: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
                              <Image
                                src={currentTestimonial.image}
                                alt="Testimonio"
                                width={224}
                                height={224}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <StarRating stars={currentTestimonial.stars} />

                          <p className="text-white font-medium leading-relaxed max-w-xs mx-auto px-2" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.25rem)' }}>
                            "{currentTestimonial.text}"
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
