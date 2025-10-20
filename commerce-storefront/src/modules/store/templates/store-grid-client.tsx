"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductGridItem from "@modules/products/components/product-grid-item"
import ProductActions from "@modules/products/components/product-actions"
import ProductInfoAccordion from "@modules/products/components/product-info-accordion"
import { Pagination } from "@modules/store/components/pagination"
import TestimonialsSection from "@modules/home/components/testimonials-section"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import Image from "next/image"

const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url) return false
  // En desarrollo, permitir localhost
  // En producción, deberías usar URLs de CDN (S3, Cloudinary, etc.)
  return true
}

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

  const initialProduct = selectedHandle
    ? products.find(p => p.handle === selectedHandle) || products[0]
    : products[0]

  const [selectedProduct, setSelectedProduct] = useState<HttpTypes.StoreProduct | null>(
    initialProduct || null
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0, xPx: 0, yPx: 0 })

  const handleProductClick = (product: HttpTypes.StoreProduct) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0) 
    setShowMagnifier(false)
    router.push(`/${countryCode}/store/${product.handle}`, { scroll: false })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget
    const { top, left, width, height } = elem.getBoundingClientRect()
    
    const xPercent = ((e.clientX - left) / width) * 100
    const yPercent = ((e.clientY - top) / height) * 100
    
    const xPx = e.clientX
    const yPx = e.clientY
    
    setMagnifierPosition({ x: xPercent, y: yPercent, xPx, yPx })
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

  if (!selectedProduct || products.length === 0) {
    return (
      <div className="min-h-screen bg-novapatch-bg-cream flex items-center justify-center">
        <p className="text-gray-500 text-lg">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-novapatch-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-8">

            <div 
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                backgroundColor: (selectedProduct.metadata?.bg_color as string) || '#b3dbde'
              }}
            >
              <div className="absolute bottom-0 left-0 w-full h-full z-0 pointer-events-none">
                <Image
                  src="/assets/products/flower-big.webp"
                  alt="Background"
                  fill
                  className="object-contain object-left-bottom scale-90 translate-y-12 -translate-x-8"
                  priority
                />
              </div>

              <div
                className="relative w-full max-w-md mx-auto cursor-crosshair group z-10"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
              >
                <div className="relative aspect-[3/4] overflow-visible rounded-lg">
                  {selectedProduct.images && selectedProduct.images.length > 0 && isValidImageUrl(selectedProduct.images[currentImageIndex]?.url) ? (
                    <Image
                      src={selectedProduct.images[currentImageIndex].url!}
                      alt={selectedProduct.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  ) : isValidImageUrl(selectedProduct.thumbnail) ? (
                    <Image
                      src={selectedProduct.thumbnail!}
                      alt={selectedProduct.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>Sin imagen disponible</span>
                    </div>
                  )}
                </div>

                {showMagnifier && (isValidImageUrl(selectedProduct.images?.[currentImageIndex]?.url) || isValidImageUrl(selectedProduct.thumbnail)) && (
                  <div
                    className="fixed border-4 border-white shadow-2xl rounded-lg pointer-events-none overflow-hidden z-50 bg-white"
                    style={{
                      width: '300px',
                      height: '300px',
                      left: `${magnifierPosition.xPx}px`,
                      top: `${magnifierPosition.yPx}px`,
                      transform: 'translate(-50%, -50%)',
                      backgroundImage: `url(${isValidImageUrl(selectedProduct.images?.[currentImageIndex]?.url) ? selectedProduct.images?.[currentImageIndex]?.url : selectedProduct.thumbnail})`,
                      backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                      backgroundSize: '250%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )}

                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                  <ZoomIn className="w-5 h-5 text-novapatch-title" />
                </div>
              </div>

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

            <div className="lg:hidden">
              <h1 className="text-3xl font-bold text-novapatch-primary mb-2">
                {selectedProduct.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {selectedProduct.subtitle || "30 parches transparentes"}
              </p>
            </div>

            <ProductInfoAccordion product={selectedProduct} />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-novapatch-primary mb-2">
                {selectedProduct.title}
              </h1>
              <p className="text-lg text-gray-600">
                {selectedProduct.subtitle || "30 parches transparentes"}
              </p>
            </div>

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

            <div>
              <ProductActions
                product={selectedProduct}
                region={region}
                disabled={false}
              />
            </div>

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

      <div className="mt-24 mb-24">
        <TestimonialsSection />
      </div>
    </div>
  )
}
