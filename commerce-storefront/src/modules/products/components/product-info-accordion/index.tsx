"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

type AccordionItem = {
  title: string
  content: string
  icon?: string
}

type ProductInfoAccordionProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductInfoAccordion({ product }: ProductInfoAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const accordionItems: AccordionItem[] = []

  if (product.metadata?.how_to_use && typeof product.metadata.how_to_use === 'string') {
    accordionItems.push({
      title: "CÓMO SE USA",
      content: product.metadata.how_to_use
    })
  }

  if (product.metadata?.ingredients && typeof product.metadata.ingredients === 'string') {
    accordionItems.push({
      title: "INGREDIENTES",
      content: product.metadata.ingredients
    })
  }

  const whatsIncludesData = product.metadata?.whats_includes || product.metadata?.whats_included
  if (whatsIncludesData) {
    const content = typeof whatsIncludesData === 'string'
      ? whatsIncludesData
      : Array.isArray(whatsIncludesData)
      ? `<ul class="list-disc pl-5 space-y-1">${whatsIncludesData.map((item: string) => `<li>${item}</li>`).join('')}</ul>`
      : String(whatsIncludesData)
    
    accordionItems.push({
      title: "QUÉ INCLUYE",
      content
    })
  }

  if (product.metadata?.benefits) {
    const content = typeof product.metadata.benefits === 'string'
      ? product.metadata.benefits
      : Array.isArray(product.metadata.benefits)
      ? `<ul class="list-disc pl-5 space-y-1">${product.metadata.benefits.map((item: string) => `<li>${item}</li>`).join('')}</ul>`
      : String(product.metadata.benefits)
    
    accordionItems.push({
      title: "BENEFICIOS",
      content
    })
  }

  if (accordionItems.length === 0) {
    return null
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="">
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-300 last:border-b-0"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between py-4 px-6 text-left"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-sm font-medium text-black uppercase tracking-wide">
              {item.title}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 px-6">
              <div
                className="prose prose-sm max-w-none text-black"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
