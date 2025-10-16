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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Construir los items del acordeón desde la metadata del producto
  const accordionItems: AccordionItem[] = []

  // 1. Cómo se usa (how_to_use)
  if (product.metadata?.how_to_use && typeof product.metadata.how_to_use === 'string') {
    accordionItems.push({
      title: "CÓMO SE USA",
      content: product.metadata.how_to_use
    })
  }

  // 2. Ingredientes (ingredients)
  if (product.metadata?.ingredients && typeof product.metadata.ingredients === 'string') {
    accordionItems.push({
      title: "INGREDIENTES",
      content: product.metadata.ingredients
    })
  }

  // 3. Qué incluye (whats_included)
  if (product.metadata?.whats_included && typeof product.metadata.whats_included === 'string') {
    accordionItems.push({
      title: "QUÉ INCLUYE",
      content: product.metadata.whats_included
    })
  }

  // 4. Beneficios (benefits)
  if (product.metadata?.benefits && typeof product.metadata.benefits === 'string') {
    accordionItems.push({
      title: "BENEFICIOS",
      content: product.metadata.benefits
    })
  }

  // Si no hay items, no mostrar nada
  if (accordionItems.length === 0) {
    return null
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white border-t border-b border-gray-300">
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-300 last:border-b-0"
        >
          {/* Header del acordeón */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
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

          {/* Contenido del acordeón */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4">
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

