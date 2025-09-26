"use client"

import { useState } from "react"
import Image from "next/image"

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      stars: 5,
      text: "Usé el de energía por la mañana y el de sueño en la noche. ¡Una maravilla!",
      image: "../../../images/testimonials/woman3.svg"
    },
    {
      stars: 5,
      text: "¡Me salvan en el trabajo! Me siento con energía y súper concentrada.",
      image: "../../../images/testimonials/woman-2.svg"
    },
    {
      stars: 5,
      text: "Estoy fascinada. ¡El parche de inmunidad diaria es mi favorito!",
      image: "../../../images/testimonials/woman-1.svg"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const StarRating = ({ stars }: { stars: number }) => (
    <div className="flex justify-center text-white mb-4">
      {Array(stars).fill(0).map((_, i) => (
        <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: '#dac70a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Carrusel */}
        <div className="relative">
          {/* Botón anterior */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón siguiente */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-8 md:px-16">
                    {/* Mostrar 3 testimonios en desktop, 1 en mobile */}
                    {Array.from({ length: 3 }).map((_, cardIndex) => {
                      const testimonialIndex = (currentSlide + cardIndex) % testimonials.length
                      const currentTestimonial = testimonials[testimonialIndex]

                      return (
                        <div key={cardIndex} className={`text-center ${cardIndex > 0 ? 'hidden md:block' : ''}`}>
                          {/* Imagen */}
                          <div className="mb-6">
                            <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-3xl overflow-hidden bg-gray-200">
                              <Image
                                src={currentTestimonial.image}
                                alt="Testimonio"
                                width={224}
                                height={224}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Estrellas */}
                          <StarRating stars={currentTestimonial.stars} />

                          {/* Texto */}
                          <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-xs mx-auto">
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
