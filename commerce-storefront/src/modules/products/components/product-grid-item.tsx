"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { transformMediaUrl } from "@lib/util/transform-url"
import { useTranslations } from "next-intl"

type ProductGridItemProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isSelected: boolean
  onClick: () => void
}

// TODO: Cambiar colores dinamicamente según el producto desde el backend
// Colores pastel para cada producto basados en el nombre
const getProductColor = (title: string): string => {
  const colors: { [key: string]: string } = {
    "woman": "bg-purple-100",
    "sleep": "bg-cyan-100",
    "shield": "bg-orange-100",
    "glow": "bg-pink-100",
    "energy": "bg-blue-100",
    "zen": "bg-indigo-100",
  }

  const titleLower = title.toLowerCase()
  for (const [key, color] of Object.entries(colors)) {
    if (titleLower.includes(key)) {
      return color
    }
  }
  return "bg-gray-100" 
}

export default function ProductGridItem({
  product,
  isSelected,
  onClick,
}: ProductGridItemProps) {
  const tStore = useTranslations("store")
  const tCommon = useTranslations("common")
  const thumbnail = transformMediaUrl(product.images?.[0]?.url || product.thumbnail)
  
  const bgColor = product.metadata?.bg_color as string | undefined

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-200
        rounded-3xl overflow-hidden flex flex-col
        ${isSelected
          ? "ring-2 ring-novapatch-primary shadow-lg scale-105"
          : "hover:shadow-md"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-novapatch-primary rounded-full flex items-center justify-center shadow-md">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      )}

      <div
        className={`aspect-square relative overflow-hidden flex items-center justify-center p-8 rounded-3xl`}
        style={{
          backgroundColor: bgColor || '#f3f4f6' 
        }}
      >
        {thumbnail ? (
          <div className="relative w-full h-full">
            <Image
              src={thumbnail}
              alt={product.title || tCommon("productFallback")}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 400px"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <span className="text-sm">{tStore("noImageAvailable")}</span>
          </div>
        )}
      </div>

      <div className="py-3 text-center">
        <h3 className="font-medium text-gray-900 text-base leading-tight">
          {product.title}
        </h3>
      </div>
    </div>
  )
}
