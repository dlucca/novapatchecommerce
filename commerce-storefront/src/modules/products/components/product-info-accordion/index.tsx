"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { ChevronDown } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"
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
  const locale = useLocale()

  const toHtmlListIfArray = (value: unknown): string => {
    const tryParseJsonArray = (s: string): unknown => {
      const trimmed = s.trim()
      if (!(trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        return s
      }

      try {
        return JSON.parse(trimmed)
      } catch {
        return s
      }
    }

    const normalized = typeof value === "string" ? tryParseJsonArray(value) : value

    if (Array.isArray(normalized)) {
      const items = normalized.map((v) => String(v))
      return `<ul class="list-disc pl-5 space-y-1">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
    }

    return typeof normalized === "string" ? normalized : String(normalized)
  }

  const getLocalizedMetaString = (baseKey: string): string | null => {
    const md = product.metadata as Record<string, unknown> | undefined
    if (!md) return null

    const localizedKey = `${baseKey}_${locale}`

    const localizedValue = md[localizedKey]
    if (typeof localizedValue === "string" && localizedValue.trim().length > 0) {
      return localizedValue
    }

    const baseValue = md[baseKey]
    if (typeof baseValue === "string" && baseValue.trim().length > 0) {
      return baseValue
    }

    return null
  }

  const t = useTranslations("description");
  const accordionItems: AccordionItem[] = []

  const howToUse = getLocalizedMetaString("how_to_use")
  if (howToUse) {
    accordionItems.push({
      title: t("howItWorks"),
      content: howToUse,
    })
  }

  const ingredients = getLocalizedMetaString("ingredients")
  if (ingredients) {
    accordionItems.push({
      title: t("benefits"),
      content: ingredients,
    })
  }

  const md = product.metadata as Record<string, unknown> | undefined
  const whatsIncludesData =
    (md && (md[`whats_includes_${locale}`] ?? md[`whats_included_${locale}`] ?? md["whats_includes"] ?? md["whats_included"])) ||
    null
  if (whatsIncludesData) {
    const content = toHtmlListIfArray(whatsIncludesData)
    
    accordionItems.push({
      title: t("whatIncludes"),
      content
    })
  }

  const benefitsData =
    (md && (md[`benefits_${locale}`] ?? md["benefits"])) ||
    null
  if (benefitsData) {
    const content = toHtmlListIfArray(benefitsData)
    
    accordionItems.push({
      title: t("usage"),
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

