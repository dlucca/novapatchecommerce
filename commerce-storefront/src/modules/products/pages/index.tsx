import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@/components/ui/skeletons/pages/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }
  // TODO

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen">
        <div className="max-w-7xl mx-auto" style={{ padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)' }}>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            data-testid="product-container"
          >
            {/* Columna Izquierda - Galería de Imágenes */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                <ImageGallery images={product?.images || []} />
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                <h1
                  className="font-bold text-novapatch-title leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  data-testid="product-title"
                >
                  {product.title}
                </h1>

                {product.subtitle && (
                  <p className="text-gray-600 mb-4" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)' }}>
                    {product.subtitle}
                  </p>
                )}

                <p className="text-gray-700 font-medium mb-6" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                  30 parches transpar
                </p>

                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>

                {product.description && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3" style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)' }}>
                      Descripción
                    </h3>
                    <p
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
                      data-testid="product-description"
                    >
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4" style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)' }}>
                    Beneficios
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                        Alta tasa de absorción
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                        Sin pastillas difíciles de tragar
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                        Sin azúcar ni calorías
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700" style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                        No afecta tu sistema digestivo
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(1rem, 2vw, 2rem)' }}>
          <h2 className="font-bold text-novapatch-title mb-8" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            También te puede interesar
          </h2>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
