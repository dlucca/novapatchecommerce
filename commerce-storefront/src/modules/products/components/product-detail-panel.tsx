"use client"

import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import { addToCart } from "@lib/data/cart"
import { logger } from "@lib/util/logger"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { useState } from "react"

type ProductDetailPanelProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

export default function ProductDetailPanel({
  product,
  region,
  countryCode,
}: ProductDetailPanelProps) {
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("subscription")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [itemAdded, setItemAdded] = useState(false)

  const images = product.images || []
  const mainImage = images[0]?.url || product.thumbnail || "/placeholder.png"
  const { cheapestPrice } = getProductPrice({ product })

  const oneTimePrice = cheapestPrice?.calculated_price_number
    ? convertToLocale({
        amount: cheapestPrice.calculated_price_number,
        currency_code: region.currency_code,
      })
    : "N/A"

  const subscriptionPrice = cheapestPrice?.calculated_price_number
    ? convertToLocale({
        amount: Math.round(cheapestPrice.calculated_price_number * 0.8), // 20% descuento
        currency_code: region.currency_code,
      })
    : "N/A"

  const handleAddToCart = async () => {
    // Obtener la primera variante disponible del producto
    const variant = product.variants?.[0]

    if (!variant?.id) {
      logger.error("No variant found for product", new Error(`Product ${product.id} has no variants`), { context: 'ProductDetailPanel' })
      return
    }

    setIsAdding(true)

    try {
      await addToCart({
        variantId: variant.id,
        quantity,
        countryCode,
      })

      setItemAdded(true)
      logger.info(`Product added to cart: ${product.title}, quantity: ${quantity}, type: ${purchaseType}`)
    } catch (error) {
      logger.error("Failed to add product to cart", error as Error, { context: 'ProductDetailPanel' })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-12">
        <div className="aspect-square relative max-w-md mx-auto">
          <Image
            src={mainImage}
            alt={product.title || "Product"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          {product.subtitle && (
            <p className="text-lg text-gray-600">{product.subtitle}</p>
          )}
        </div>

        <div className="space-y-3">
          <label
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              purchaseType === "one-time"
                ? "border-[#00BCD4] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === "one-time"}
              onChange={() => setPurchaseType("one-time")}
              className="mt-1 w-4 h-4 text-[#00BCD4] focus:ring-[#00BCD4]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Compra única</span>
                <span className="text-xl font-bold text-gray-900">
                  {oneTimePrice}
                </span>
              </div>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              purchaseType === "subscription"
                ? "border-[#00BCD4] bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === "subscription"}
              onChange={() => setPurchaseType("subscription")}
              className="mt-1 w-4 h-4 text-[#00BCD4] focus:ring-[#00BCD4]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Suscríbete y ahorra</span>
                  <span className="bg-[#00BCD4] text-white text-xs font-bold px-2 py-0.5 rounded">
                    Ahorra 20%
                  </span>
                </div>
                <span className="text-xl font-bold text-[#00BCD4]">
                  {subscriptionPrice}
                </span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#00BCD4]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  ¡Pausa, cambia o cancela en cualquier momento!
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#00BCD4]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Entrega cada 30 días
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#00BCD4]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Envío gratuito a partir del segundo pedido
                </li>
              </ul>
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <div className="flex items-center border-2 border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              −
            </button>
            <span className="px-6 py-3 font-medium text-gray-900 border-x-2 border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agregando...
              </>
            ) : itemAdded ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Agregado!
              </>
            ) : (
              "Agregar al carrito"
            )}
          </button>

          {itemAdded && (
            <LocalizedClientLink
              href="/cart"
              className="w-full bg-white border-2 border-[#00BCD4] text-[#00BCD4] hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
              Ir al carrito
            </LocalizedClientLink>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          {product.description && typeof product.description === 'string' ? (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          ) : null}

          {product.metadata?.beneficios && typeof product.metadata.beneficios === 'string' ? (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Beneficios</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.metadata.beneficios}
              </p>
            </div>
          ) : null}

          {product.metadata?.uso && typeof product.metadata.uso === 'string' ? (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Modo de Uso</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.metadata.uso}
              </p>
            </div>
          ) : null}

          {product.metadata && Object.keys(product.metadata).filter(key => !['uso', 'beneficios'].includes(key)).length > 0 ? (
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Características</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.metadata)
                  .filter(([key]) => !['uso', 'beneficios'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {String(value)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

