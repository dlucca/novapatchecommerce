"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
// TODO: Suscripciones - refactor
type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

type SubscriptionPlan = 'monthly' | 'bimonthly' | 'quarterly'

const SUBSCRIPTION_PLANS = {
  monthly: {
    name: 'Mensual',
    discount: 15,
    interval: 'cada 30 días',
    description: 'Envío cada 30 días'
  },
  bimonthly: {
    name: 'Bimestral',
    discount: 20,
    interval: 'cada 60 días',
    description: 'Envío cada 60 días, envío gratis en pedidos +$50'
  },
  quarterly: {
    name: 'Trimestral',
    discount: 25,
    interval: 'cada 90 días',
    description: 'Envío cada 90 días, envío gratis siempre'
  }
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState<'single' | 'subscription'>('single')
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>('bimonthly')
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    // If there's only one variant, return it directly
    if (product.variants.length === 1) {
      return product.variants[0]
    }

    // For multiple variants, find the one matching selected options
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    // If there's only one variant, it's always valid
    if (product.variants?.length === 1) {
      return true
    }
    
    // For multiple variants, check if the selected options match a variant
    if (!product.variants || Object.keys(options).length === 0) {
      return false
    }
    
    return product.variants.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) {
      return false
    }

    // If we don't manage inventory, we can always add to cart
    if (!selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if ((selectedVariant.inventory_quantity ?? 0) > 0) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  // Calculate discounted price for subscription based on selected plan
  const getSubscriptionPrice = () => {
    if (!selectedVariant?.calculated_price) return null

    const plan = SUBSCRIPTION_PLANS[subscriptionPlan]
    const originalAmount = selectedVariant.calculated_price.calculated_amount || 0
    const discountMultiplier = 1 - (plan.discount / 100)
    const discountedAmount = Math.round(originalAmount * discountMultiplier)
    const currencyCode = selectedVariant.calculated_price.currency_code || 'MXN'

    return {
      original: convertToLocale({
        amount: originalAmount,
        currency_code: currencyCode,
      }),
      discounted: convertToLocale({
        amount: discountedAmount,
        currency_code: currencyCode,
      }),
      discount: plan.discount,
    }
  }

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    const metadata: Record<string, any> = {}

    // Add subscription metadata if subscription is selected
    if (purchaseType === 'subscription') {
      metadata.is_subscription = true
      metadata.subscription_plan = subscriptionPlan
      metadata.subscription_discount = SUBSCRIPTION_PLANS[subscriptionPlan].discount
    }

    await addToCart({
      variantId: selectedVariant.id,
      quantity: quantity,
      countryCode,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    })

    setIsAdding(false)
    setShowSuccess(true)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <>
      <div className="flex flex-col gap-4" ref={actionsRef}>
        {/* Opciones de variantes (si hay más de una) */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-3">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* Radio buttons de tipo de compra */}
        <div className="space-y-3">
          <label className={`flex items-start gap-3 cursor-pointer p-3 border-2 rounded-lg transition-colors ${
            purchaseType === 'single' 
              ? 'border-novapatch-button bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === 'single'}
              onChange={() => setPurchaseType('single')}
              className="mt-1 w-4 h-4 text-novapatch-button focus:ring-novapatch-button"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Compra única</span>
                <span className="font-bold text-gray-900">
                  {selectedVariant && (
                    <ProductPrice product={product} variant={selectedVariant} />
                  )}
                </span>
              </div>
            </div>
          </label>

          <label className={`flex items-start gap-3 cursor-pointer p-3 border-2 rounded-lg transition-colors ${
            purchaseType === 'subscription'
              ? 'border-novapatch-button bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === 'subscription'}
              onChange={() => setPurchaseType('subscription')}
              className="mt-1 w-4 h-4 text-novapatch-button focus:ring-novapatch-button"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Suscríbete y ahorra</span>
                  <span className="bg-novapatch-button text-white text-xs font-bold px-2 py-0.5 rounded">
                    Ahorra {SUBSCRIPTION_PLANS[subscriptionPlan].discount}%
                  </span>
                </div>
                <div className="text-right">
                  {(() => {
                    const subscriptionPrice = getSubscriptionPrice()
                    if (!subscriptionPrice) return null

                    return (
                      <>
                        <div className="text-gray-500 line-through text-sm">
                          {subscriptionPrice.original}
                        </div>
                        <div className="font-bold text-novapatch-button text-lg">
                          {subscriptionPrice.discounted}
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>

              {/* Selector de plan de suscripción */}
              {purchaseType === 'subscription' && (
                <div className="mb-3">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Elige tu plan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(SUBSCRIPTION_PLANS) as SubscriptionPlan[]).map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setSubscriptionPlan(plan)}
                        className={`p-2 text-xs rounded-lg border-2 transition-colors ${
                          subscriptionPlan === plan
                            ? 'border-novapatch-button bg-novapatch-button text-white'
                            : 'border-gray-300 hover:border-novapatch-button'
                        }`}
                      >
                        <div className="font-semibold">{SUBSCRIPTION_PLANS[plan].name}</div>
                        <div className="text-xs opacity-90">{SUBSCRIPTION_PLANS[plan].discount}% OFF</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-novapatch-button flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ¡Pausa, cambia o cancela en cualquier momento!
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-novapatch-button flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {SUBSCRIPTION_PLANS[subscriptionPlan].description}
                </li>
              </ul>
            </div>
          </label>
        </div>

        {/* Cantidad + Botón Agregar en la misma fila */}
        <div className="flex items-center gap-3">
          {/* Selector de cantidad */}
          <div className="flex items-center gap-2 border-2 border-gray-300 rounded-full">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isAdding}
              className="w-10 h-12 flex items-center justify-center text-gray-700 hover:text-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (val > 0) setQuantity(val)
              }}
              className="w-12 h-12 text-center font-semibold text-gray-900 focus:outline-none bg-transparent"
              min="1"
            />
            <button
              onClick={incrementQuantity}
              disabled={isAdding}
              className="w-10 h-12 flex items-center justify-center text-gray-700 hover:text-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Botón Agregar al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || !inStock || isAdding || !!disabled}
            className="flex-1 bg-novapatch-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 flex items-center justify-center gap-2"
            data-testid="add-product-button"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agregando...
              </>
            ) : !selectedVariant ? (
              "Seleccionar variante"
            ) : !inStock ? (
              "Agotado"
            ) : (
              "agregar"
            )}
          </button>
        </div>

        {/* Mensaje de éxito y botón ir al carrito */}
        {showSuccess && (
          <div className="bg-novapatch-primary/10 border-2 border-novapatch-primary rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-novapatch-primary rounded-full p-1">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-novapatch-primary font-medium">¡Producto agregado al carrito!</span>
            </div>
            <LocalizedClientLink
              href="/cart"
              className="bg-novapatch-primary hover:bg-novapatch-primary/90 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
            >
              Ver carrito
            </LocalizedClientLink>
          </div>
        )}

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
