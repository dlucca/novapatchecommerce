"use client"

import { isManual, isStripe, isMercadoPago } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { createMercadoPagoPreference } from "@lib/data/mercadopago"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

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
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled className="w-full bg-gray-300 text-gray-500 text-base py-3 rounded-full border-0">Selecciona un método de pago</Button>
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
        Realizar Pedido
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
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      console.log("Creating Mercado Pago preference for cart:", cart.id)
      
      // Crear preferencia de pago en Mercado Pago
      const preference = await createMercadoPagoPreference(cart.id)

      console.log("Preference created:", preference)

	      const mpEnv = process.env.NEXT_PUBLIC_MERCADOPAGO_ENV
	      const useSandbox = mpEnv
	        ? mpEnv !== "production"
	        : process.env.NODE_ENV !== "production"

	      const redirectUrl = useSandbox
	        ? (preference.sandboxInitPoint || preference.initPoint)
	        : preference.initPoint

      if (redirectUrl) {
        console.log("Redirecting to:", redirectUrl)
        window.location.href = redirectUrl
      } else {
        throw new Error("No se pudo obtener la URL de pago de Mercado Pago")
      }
    } catch (err: any) {
      console.error("Error creating Mercado Pago preference:", err)
      setErrorMessage(err.message || "Error al procesar el pago con Mercado Pago")
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
        {submitting ? "Redirigiendo a Mercado Pago..." : "Pagar con Mercado Pago"}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="mercadopago-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
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
        Realizar Pedido
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
