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
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4" style={{ color: '#005088' }}>
            ¿Tienes dudas?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-white font-medium py-4 px-6 rounded-2xl text-left transition-colors duration-200 flex items-center justify-between"
                style={{ backgroundColor: '#4e83bb' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d6a96'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4e83bb'}
              >
                <span className="text-sm md:text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openFAQ === index && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm md:text-base text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button
            className="text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
            style={{ backgroundColor: '#4e83bb' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d6a96'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4e83bb'}
          >
            Suscríbete y ahorra
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
