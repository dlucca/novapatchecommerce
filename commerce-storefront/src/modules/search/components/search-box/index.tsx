"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { convertToLocale } from "@lib/util/money"

interface SearchBoxProps {
  isOpen: boolean
  close: () => void
  countryCode: string
  scrolled?: boolean
}

const SearchBox = ({ isOpen, close, countryCode, scrolled = false }: SearchBoxProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setShowResults(false)
      return
    }

    setShowResults(true)
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&countryCode=${countryCode}`
        )
        const data = await response.json()
        setResults(data.products || [])
      } catch (error) {
        console.error("Search error:", error)
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
    setShowResults(false)
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

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="absolute left-0 right-0 top-full mt-2 z-50"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center px-6 py-4 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
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
                ref={inputRef}
                type="text"
                className="flex-1 outline-none text-base placeholder-gray-400"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={handleClose}
                className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
                title="Cerrar búsqueda"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </form>

          {/* Results */}
          {showResults && (
            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!loading && query && results.length === 0 && (
                <div className="text-center py-8 px-6">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-300 mb-3"
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
                  <p className="text-gray-500 font-medium">No se encontraron productos</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="py-2">
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
                        href={`/products/${product.handle}`}
                        onClick={handleProductClick}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-14 h-14 flex-shrink-0">
                          <Thumbnail
                            thumbnail={product.thumbnail}
                            images={product.images}
                            size="square"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate text-sm">
                            {product.title}
                          </h3>
                          {product.description && (
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {product.description}
                            </p>
                          )}
                        </div>
                        {price && (
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-gray-900 text-sm">
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
                  
                  {results.length >= 10 && (
                    <div className="border-t border-gray-100 px-6 py-3">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Ver todos los resultados →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBox

