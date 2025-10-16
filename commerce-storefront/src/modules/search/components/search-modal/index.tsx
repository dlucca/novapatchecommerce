"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { logger } from "@lib/util/logger"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { convertToLocale } from "@lib/util/money"

interface SearchModalProps {
  isOpen: boolean
  close: () => void
  countryCode: string
}

const SearchModal = ({ isOpen, close, countryCode }: SearchModalProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&countryCode=${countryCode}`
        )
        const data = await response.json()
        setResults(data.products || [])
      } catch (error) {
        logger.error("Product search in modal failed", error as Error, { context: 'SearchModal' })
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, countryCode])

  const handleClose = () => {
    setQuery("")
    setResults([])
    close()
  }

  const handleProductClick = () => {
    handleClose()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query)}`)
      handleClose()
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="flex items-center border-b border-gray-200 px-6 py-4">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      className="flex-1 outline-none text-lg placeholder-gray-400"
                      placeholder="Buscar productos..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {loading && (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  {!loading && query && results.length === 0 && (
                    <div className="text-center py-12 px-6">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg">No se encontraron productos</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Intenta con otros términos de búsqueda
                      </p>
                    </div>
                  )}

                  {!loading && results.length > 0 && (
                    <div className="py-4">
                      {results.map((product) => {
                        const cheapestVariant = product.variants?.reduce((prev, curr) => {
                          const prevPrice = prev?.calculated_price?.calculated_amount || Infinity
                          const currPrice = curr?.calculated_price?.calculated_amount || Infinity
                          return currPrice < prevPrice ? curr : prev
                        })

                        const price = cheapestVariant?.calculated_price

                        return (
                          <LocalizedClientLink
                            key={product.id}
                            href={`/store/${product.handle}`}
                            onClick={handleProductClick}
                            className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-16 h-16 flex-shrink-0">
                              <Thumbnail
                                thumbnail={product.thumbnail}
                                images={product.images}
                                size="square"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                {product.title}
                              </h3>
                              {product.description && (
                                <p className="text-sm text-gray-500 truncate">
                                  {product.description}
                                </p>
                              )}
                            </div>
                            {price && (
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  {convertToLocale({
                                    amount: price.calculated_amount || 0,
                                    currency_code: price.currency_code || "MXN",
                                  })}
                                </p>
                              </div>
                            )}
                          </LocalizedClientLink>
                        )
                      })}
                    </div>
                  )}

                  {!loading && !query && (
                    <div className="text-center py-12 px-6">
                      <svg
                        className="w-16 h-16 mx-auto text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg">Busca tus productos favoritos</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Escribe el nombre del producto que buscas
                      </p>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SearchModal

