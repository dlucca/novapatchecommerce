'use client'

import Script from 'next/script'

/**
 * Openpay.js Script Loader
 * Loads the Openpay SDK globally so it's available for payment tokenization
 */
export function OpenpayScript() {
  return (
    <Script
      src="https://sandbox.openpay.mx/v1/openpay.js"
      strategy="afterInteractive"
    />
  )
}
