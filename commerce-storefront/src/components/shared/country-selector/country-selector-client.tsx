"use client"

import { useParams, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { getAllCountries, type CountryCode } from '@lib/util/region-detection'

/**
 * Country selector component
 */
export default function CountrySelectorClient() {
  const params = useParams()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentCountry = (params?.countryCode as CountryCode) || 'mx'
  const countries = getAllCountries()
  const currentCountryInfo = countries.find(c => c?.code === currentCountry)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCountryChange = (newCountry: CountryCode) => {
    const newPath = pathname.replace(`/${currentCountry}`, `/${newCountry}`)
    
    document.cookie = `country=${newCountry}; path=/; max-age=31536000` // 1 año
    
    window.location.href = newPath
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Seleccionar país"
      >
        <span className="text-xl">{currentCountryInfo?.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentCountryInfo?.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {countries.map((country) => (
            <button
              key={country?.code}
              onClick={() => {
                handleCountryChange(country?.code as CountryCode)
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-150 ${
                country?.code === currentCountry ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-xl">{country?.flag}</span>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900">{country?.name}</div>
                <div className="text-xs text-gray-500">{country?.currency}</div>
              </div>
              {country?.code === currentCountry && (
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

