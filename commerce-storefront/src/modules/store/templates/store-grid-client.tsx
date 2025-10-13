"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductGridItem from "@modules/products/components/product-grid-item"
import ProductActions from "@modules/products/components/product-actions"
import Thumbnail from "@modules/products/components/thumbnail"
import { Pagination } from "@modules/store/components/pagination"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Image from "next/image"

type StoreGridClientProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  countryCode: string
  currentPage: number
  totalPages: number
  selectedHandle?: string
}

export default function StoreGridClient({
  products,
  region,
  countryCode,
  currentPage,
  totalPages,
  selectedHandle,
}: StoreGridClientProps) {
  const router = useRouter()
  
  // Preseleccionar el producto basado en el handle de la URL
  const initialProduct = selectedHandle
    ? products.find(p => p.handle === selectedHandle) || products[0]
    : products[0]
    
  const [selectedProduct, setSelectedProduct] = useState<HttpTypes.StoreProduct | null>(
    initialProduct || null
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleProductClick = (product: HttpTypes.StoreProduct) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0) 
    setIsZoomed(false)
    router.push(`/${countryCode}/store/${product.handle}`, { scroll: false })
  }

  const handlePrevImage = () => {
    if (!selectedProduct?.images) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    if (!selectedProduct?.images) return
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
    )
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-8">

            <div className="bg-gradient-to-br from-[#b3dde8] to-[#d4eef5] rounded-3xl p-8 relative">
              <div 
                className="relative w-full max-w-md mx-auto cursor-pointer group"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    <Image
                      src={selectedProduct.images[currentImageIndex]?.url || selectedProduct.thumbnail || ''}
                      alt={selectedProduct.title}
                      fill
                      className={`object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-150' : 'group-hover:scale-110'
                      }`}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  ) : (
                    <Image
                      src={selectedProduct.thumbnail || ''}
                      alt={selectedProduct.title}
                      fill
                      className={`object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-150' : 'group-hover:scale-110'
                      }`}
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  )}
                </div>

                {/* Indicador de zoom */}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                  <ZoomIn className="w-5 h-5 text-novapatch-title" />
                </div>
              </div>

              {/* Controles de navegación de imágenes */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6 text-novapatch-title" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6 text-novapatch-title" />
                  </button>

                  {/* Indicadores de imágenes (dots) */}
                  <div className="flex justify-center gap-2 mt-4">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-novapatch-title w-6' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Descripción y beneficios */}
            <div className="space-y-6">
              {selectedProduct.description && (
                <div>
                  <h2 className="text-2xl font-bold text-novapatch-title mb-4">
                    Descripción
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                  />
                </div>
              )}

              {(() => {
                const benefits = selectedProduct.metadata?.benefits
                if (benefits && typeof benefits === 'string') {
                  return (
                    <div>
                      <h2 className="text-2xl font-bold text-novapatch-title mb-4">
                        Beneficios
                      </h2>
                      <div 
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: benefits }}
                      />
                    </div>
                  )
                }
                return null
              })()}

              {(() => {
                const ingredients = selectedProduct.metadata?.ingredients
                if (ingredients && typeof ingredients === 'string') {
                  return (
                    <div>
                      <h2 className="text-2xl font-bold text-novapatch-title mb-4">
                        Ingredientes
                      </h2>
                      <div 
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: ingredients }}
                      />
                    </div>
                  )
                }
                return null
              })()}
            </div>
          </div>

          {/* COLUMNA DERECHA: Título + Grid + Opciones de compra */}
          <div className="space-y-6">
            {/* Título del producto */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-novapatch-title mb-2">
                {selectedProduct.title}
              </h1>
              <p className="text-lg text-gray-600">
                {selectedProduct.subtitle || "30 parches transparentes"}
              </p>
            </div>

            {/* Grid de productos con scroll condicional */}
            <div className="border-b border-gray-200 pb-6">
              <div className={`${products.length > 6 ? 'max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' : ''}`}>
                <div className="grid grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductGridItem
                      key={product.id}
                      product={product}
                      region={region}
                      isSelected={selectedProduct?.id === product.id}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Opciones de compra simplificadas */}
            <div>
              <ProductActions
                product={selectedProduct}
                region={region}
                disabled={false}
              />
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  data-testid="product-pagination"
                  page={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
