import React from "react"
import { CreditCard } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { titleKey: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    titleKey: "creditCard",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    titleKey: "ideal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    titleKey: "bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    titleKey: "paypal",
    icon: <PayPal />,
  },
  pp_system_default: {
    titleKey: "manualPayment",
    icon: <CreditCard />,
  },
  pp_mercadopago_mercadopago: {
    titleKey: "mercadoPago",
    icon: <CreditCard />,
  },
  pp_openpay_openpay: {
    titleKey: "openpay",
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_")
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}
export const isMercadoPago = (providerId?: string) => {
  return providerId === "pp_mercadopago_mercadopago" || providerId?.includes("mercadopago")
}
export const isOpenpay = (providerId?: string) => {
  return providerId === "pp_openpay_openpay" || providerId?.includes("openpay")
}

export const getPaymentTitleKey = (providerId?: string | null, locale?: string) => {
  if (!providerId) {
    return undefined
  }

  if (isManual(providerId)) {
    return locale === "pt" ? "mercadoPago" : "openpay"
  }

  return paymentInfoMap[providerId]?.titleKey
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
