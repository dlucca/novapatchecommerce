"use client"

import { useState } from "react"

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Cómo contacto al equipo de atención al cliente?",
      answer: "Puedes contactarnos a través de nuestro chat en vivo, email a soporte@novapatch.com o llamando al +1-800-NOVAPATCH. Nuestro equipo está disponible de lunes a viernes de 9am a 6pm."
    },
    {
      question: "¿Puedo recibir descuentos sin suscribirme?",
      answer: "Sí, ofrecemos descuentos ocasionales para compras individuales. Suscríbete a nuestro newsletter para recibir ofertas especiales y códigos de descuento exclusivos."
    },
    {
      question: "¿Vale la pena suscribirme si es mi primera compra?",
      answer: "¡Absolutamente! La suscripción te da acceso a descuentos exclusivos desde tu primera compra, envío gratuito y la flexibilidad de pausar o cancelar en cualquier momento."
    },
    {
      question: "¿Cómo se aplican los descuentos?",
      answer: "Los descuentos se aplican automáticamente en el checkout. Los suscriptores reciben descuentos adicionales que se reflejan en el precio final antes del pago."
    },
    {
      question: "¿Qué medios de pago aceptan?",
      answer: "Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay y transferencias bancarias."
    },
    {
      question: "¿Cuánto tarda en llegar mi pedido?",
      answer: "Los pedidos se procesan en 1-2 días hábiles. El envío estándar toma 3-5 días hábiles, mientras que el envío express llega en 1-2 días hábiles."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="bg-white" style={{paddingBottom: 'clamp(5rem, 6vw, 6rem)' }}>
      <div className="max-w-7xl mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(2.5rem, 3vw, 3rem)' }}>
          <h2
            className="font-bold leading-tight text-novapatch-title"
            style={{ marginBottom: 'clamp(0.75rem, 1vw, 1rem)' }}
          >
            ¿Tienes dudas?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto" style={{ gap: 'clamp(1rem, 1.5vw, 1.5rem)' }}>
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-white font-medium text-left transition-colors duration-200 flex items-center justify-between gap-3 shadow-md hover:shadow-lg bg-novapatch-button hover:bg-novapatch-title"
                style={{
                  padding: 'clamp(0.75rem, 1vw, 1rem) clamp(1.25rem, 1.5vw, 1.5rem)',
                  borderRadius: 'clamp(0.75rem, 1vw, 1rem)',
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }}
              >
                <span className="leading-tight pr-2">
                  {faq.question}
                </span>
                <svg
                  className={`w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)] flex-shrink-0 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-gray-50 shadow-inner animate-fade-in" style={{ marginTop: 'clamp(0.5rem, 0.75vw, 0.75rem)', padding: 'clamp(1rem, 1.25vw, 1.25rem)', borderRadius: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 'clamp(2.5rem, 3vw, 3rem)' }}>
          <button
            className="text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg bg-novapatch-button hover:bg-novapatch-title"
            style={{
              padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(2rem, 2.5vw, 2.5rem)',
              borderRadius: 'clamp(0.5rem, 0.75vw, 0.75rem)',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)'
            }}
          >
            Suscríbete y ahorra
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
