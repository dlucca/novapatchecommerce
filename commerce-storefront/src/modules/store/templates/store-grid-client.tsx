"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductGridItem from "@modules/products/components/product-grid-item"
import ProductDetailPanel from "@modules/products/components/product-detail-panel"
import { Pagination } from "@modules/store/components/pagination"

type StoreGridClientProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  countryCode: string
  currentPage: number
  totalPages: number
}

export default function StoreGridClient({
  products,
  region,
  countryCode,
  currentPage,
  totalPages,
}: StoreGridClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<HttpTypes.StoreProduct | null>(
    products[0] || null
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_700px] gap-8">
          <div>
            {selectedProduct ? (
              <ProductDetailPanel
                product={selectedProduct}
                region={region}
                countryCode={countryCode}
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 shadow-xl flex items-center justify-center h-96">
                <p className="text-gray-500 text-lg">
                  Selecciona un producto para ver los detalles
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Productos</h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedProduct?.subtitle || "30 parches transparentes"}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5 mb-8">
              {products.map((product) => (
                <ProductGridItem
                  key={product.id}
                  product={product}
                  region={region}
                  isSelected={selectedProduct?.id === product.id}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
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
    </div>
  )
}

