"use client"

import { isManual, isStripe, isMercadoPago, isOpenpay } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { createMercadoPagoPreference } from "@lib/data/mercadopago"
import { createOpenpayPreference } from "@lib/data/openpay"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import { useTranslations } from "next-intl"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const t = useTranslations("checkout")
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]
  
  // Detectar región del carrito por currency_code
  const isMexicoRegion = cart.currency_code?.toLowerCase() === 'mxn'
  const isBrazilRegion = cart.currency_code?.toLowerCase() === 'brl'

  // Si es México, usar Openpay independientemente del payment provider
  if (isMexicoRegion) {
    return (
      <OpenpayPaymentButton 
        notReady={notReady} 
        cart={cart}
        data-testid={dataTestId} 
      />
    )
  }

  // Si es Brasil, usar MercadoPago independientemente del payment provider
  if (isBrazilRegion) {
    return (
      <MercadoPagoPaymentButton 
        notReady={notReady} 
        cart={cart}
        data-testid={dataTestId} 
      />
    )
  }

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isMercadoPago(paymentSession?.provider_id):
      return (
        <MercadoPagoPaymentButton 
          notReady={notReady} 
          cart={cart}
          data-testid={dataTestId} 
        />
      )
    case isOpenpay(paymentSession?.provider_id):
      return (
        <OpenpayPaymentButton 
          notReady={notReady} 
          cart={cart}
          data-testid={dataTestId} 
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return (
        <Button disabled className="w-full bg-gray-300 text-gray-500 text-base py-3 rounded-full border-0">
          {t("payment.selectMethod")}
        </Button>
      )
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const t = useTranslations("checkout")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
      >
        {t("payment.placeOrder")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const MercadoPagoPaymentButton = ({ 
  notReady,
  cart 
}: { 
  notReady: boolean
  cart: HttpTypes.StoreCart
}) => {
  const t = useTranslations("checkout")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {      
      // Crear preferencia de pago en Mercado Pago
      const preference = await createMercadoPagoPreference(cart.id)

	      const mpEnv = process.env.NEXT_PUBLIC_MERCADOPAGO_ENV
	      const useSandbox = mpEnv
	        ? mpEnv !== "production"
	        : process.env.NODE_ENV !== "production"

	      const redirectUrl = useSandbox
	        ? (preference.sandboxInitPoint || preference.initPoint)
	        : preference.initPoint

      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        throw new Error(t("payment.mercadoPagoUrlError"))
      }
    } catch (err: unknown) {
      console.error("Error creating Mercado Pago preference:", err)
      setErrorMessage(
        err instanceof Error ? err.message : t("payment.mercadoPagoError")
      )
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
      >
        {submitting ? t("payment.redirectingMercadoPago") : t("payment.payWithMercadoPago")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="mercadopago-payment-error-message"
      />
    </>
  )
}

const OpenpayPaymentButton = ({ 
  notReady,
  cart 
}: { 
  notReady: boolean
  cart: HttpTypes.StoreCart
}) => {
  const t = useTranslations("checkout")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {      
      // Crear preferencia de pago en Openpay
      const preference = await createOpenpayPreference(cart.id, window.location.origin)

      const openpayEnv = process.env.NEXT_PUBLIC_OPENPAY_ENV
      const useSandbox = openpayEnv
        ? openpayEnv !== "production"
        : process.env.NODE_ENV !== "production"

      const redirectUrl = useSandbox
        ? (preference.sandboxInitPoint || preference.initPoint)
        : preference.initPoint

      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        throw new Error(t("payment.openpayUrlError"))
      }
    } catch (err: unknown) {
      console.error("Error creating Openpay preference:", err)
      setErrorMessage(err instanceof Error ? err.message : t("payment.openpayError"))
      setSubmitting(false)
    }
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
      >
        {submitting ? t("payment.redirectingOpenpay") : t("payment.payWithOpenpay")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="openpay-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const t = useTranslations("checkout")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className="w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
      >
        {t("payment.placeOrder")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
