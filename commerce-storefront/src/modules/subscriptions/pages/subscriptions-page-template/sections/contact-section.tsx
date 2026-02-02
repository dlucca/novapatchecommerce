"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function SubscriptionsContactSection() {
  const t = useTranslations("subscriptions.contact")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    reason: "",
    question: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ reason: "", question: "", email: "" })
  }

  return (
    <section ref={sectionRef} className="bg-[#f0f7fa] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6 sm:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="type-title font-bold text-novapatch-title inline-block relative">
            ¿Tienes{" "}
            <span className="text-novapatch-button italic font-normal">dudas?</span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-novapatch-button to-transparent"></div>
          </h2>
        </div>

        {/* Form */}
        <div
          className={`transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="type-subtitle font-bold text-novapatch-title mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-600 type-body mb-4">Te responderemos a la brevedad.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-novapatch-button font-semibold hover:underline type-button"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Reason select */}
              <div>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-full bg-novapatch-button text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-novapatch-title appearance-none cursor-pointer type-body"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5rem",
                  }}
                >
                  <option value="" disabled className="text-gray-700">
                    ¿Por qué nos estás escribiendo?
                  </option>
                  <option value="subscription" className="text-gray-700">Consulta sobre suscripciones</option>
                  <option value="products" className="text-gray-700">Consulta sobre productos</option>
                  <option value="shipping" className="text-gray-700">Consulta sobre envíos</option>
                  <option value="other" className="text-gray-700">Otro motivo</option>
                </select>
              </div>

              {/* Question input */}
              <div>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  placeholder="¿Qué quieres saber sobre las suscripciones?"
                  className="w-full px-4 py-3 rounded-full bg-novapatch-button text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-novapatch-title type-body"
                />
              </div>

              {/* Email input */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="E-mail"
                  className="w-full px-4 py-3 rounded-full bg-novapatch-button text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-novapatch-title type-body"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-novapatch-title hover:bg-novapatch-footer text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 type-button"
                >
                  {isSubmitting ? "Enviando..." : "Conocer más"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
