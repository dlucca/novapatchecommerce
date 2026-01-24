"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const t = useTranslations('faq')

  const faqsConfig = [
    { questionKey: "question1", answerKey: "answer1" },
    { questionKey: "question2", answerKey: "answer2" },
    { questionKey: "question3", answerKey: "answer3" },
    { questionKey: "question4", answerKey: "answer4" },
    { questionKey: "question5", answerKey: "answer5" },
    { questionKey: "question6", answerKey: "answer6" },
  ]

  const faqs = faqsConfig.map(item => ({
    question: t(item.questionKey),
    answer: t(item.answerKey)
  }))

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="bg-white" style={{ paddingBottom: 'clamp(5rem, 6vw, 6rem)' }}>
      <div className="max-w-7xl mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(2.5rem, 3vw, 3rem)' }}>
          <h2
            className="font-bold leading-tight text-novapatch-title"
            style={{ marginBottom: 'clamp(0.75rem, 1vw, 1rem)' }}
          >
            {t('title')}
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
                  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)'
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="bg-gray-50 shadow-inner animate-fade-in" style={{ marginTop: 'clamp(0.5rem, 0.75vw, 0.75rem)', padding: 'clamp(1rem, 1.25vw, 1.25rem)', borderRadius: 'clamp(0.5rem, 0.75vw, 0.75rem)' }}>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 'clamp(2.5rem, 3vw, 3rem)' }}>
          <LocalizedClientLink href="/subscriptions">
            <button
              className="text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg bg-novapatch-button hover:bg-novapatch-title"
              style={{
                padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(2rem, 2.5vw, 2.5rem)',
                borderRadius: 'clamp(0.5rem, 0.75vw, 0.75rem)',
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)'
              }}
            >
              {t('cta')}
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
