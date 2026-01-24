import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Heading level="h2" className="text-[#0A4C6D] text-xl font-semibold">
          ¿Necesitas ayuda?
        </Heading>
      </div>
      <Text className="text-gray-600 mb-4">
        Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
      </Text>
      <div className="flex flex-wrap gap-4">
        <LocalizedClientLink
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#22b2bd] text-[#22b2bd] rounded-full hover:bg-[#22b2bd] hover:text-white transition-colors text-base font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contacto
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-base font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Devoluciones y Cambios
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
