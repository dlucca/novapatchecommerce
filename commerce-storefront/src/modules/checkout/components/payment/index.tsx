"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripe as isStripeFunc, isMercadoPago, isOpenpay, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import MercadoPagoPayment from "@modules/checkout/components/payment/mercadopago-payment"
import OpenpayPayment from "@modules/checkout/components/payment/openpay-payment"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: HttpTypes.StorePaymentProvider[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("checkout")
  const tPaymentMethods = useTranslations("paymentMethods")

  const getPaymentTitle = (providerId?: string | null) => {
    if (!providerId) return tPaymentMethods("unknown")
    const titleKey = paymentInfoMap[providerId]?.titleKey
    return titleKey ? tPaymentMethods(titleKey) : providerId
  }

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(selectedPaymentMethod)

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeFunc(method) || isMercadoPago(method) || isOpenpay(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard = cart?.total === 0

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to set payment method")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="flex items-center gap-2">
            <Heading
              level="h2"
              className={clx(
                "text-[#0A4C6D] text-xl font-semibold",
                {
                  "opacity-50 pointer-events-none select-none":
                    !isOpen && !paymentReady,
                }
              )}
            >
              {t("payment.title")}
            </Heading>
          {!isOpen && paymentReady && (
            <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
          )}
        </div>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-[#22b2bd] text-base hover:underline font-medium"
            data-testid="edit-payment-button"
          >
            {t("payment.edit")}
          </button>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length > 0 && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isStripeFunc(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : isMercadoPago(paymentMethod.id) ? (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      >
                        {selectedPaymentMethod === paymentMethod.id && activeSession && (
                          <div className="mt-4">
                            <MercadoPagoPayment
                              cart={cart}
                              session={activeSession}
                              onPaymentCompleted={() => handleSubmit()}
                            />
                          </div>
                        )}
                      </PaymentContainer>
                    ) : isOpenpay(paymentMethod.id) ? (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      >
                        {selectedPaymentMethod === paymentMethod.id && activeSession && (
                          <div className="mt-4">
                            <OpenpayPayment
                              cart={cart}
                              session={activeSession}
                              onPaymentCompleted={() => handleSubmit()}
                            />
                          </div>
                        )}
                      </PaymentContainer>
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col">
              <Text className="text-gray-500 mb-2 text-base">
                {t("payment.method")}
              </Text>
              <Text
                className="text-[#0A4C6D] text-base"
                data-testid="payment-method-summary"
              >
                {t("payment.giftCard")}
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6 w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {!activeSession && isStripeFunc(selectedPaymentMethod)
              ? t("payment.enterCardDetails")
              : t("payment.continueReview")}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Text className="text-gray-500 mb-2 text-base">
                  {t("payment.method")}
                </Text>
                <Text
                  className="text-[#0A4C6D] text-base"
                  data-testid="payment-method-summary"
                >
                  {getPaymentTitle(activeSession?.provider_id)}
                </Text>
              </div>
              <div className="flex flex-col">
                <div
                  className="flex gap-3 items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-9 w-fit p-2 bg-gray-100 rounded">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text className="text-[#0A4C6D] text-base">
                    {isStripeFunc(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : isMercadoPago(selectedPaymentMethod)
                      ? "Mercado Pago"
                      : isOpenpay(selectedPaymentMethod)
                      ? "Openpay"
                      : "Otro paso aparecerá"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col">
              <Text className="text-gray-500 mb-2 text-base">
                Método de pago
              </Text>
              <Text
                className="text-[#0A4C6D] text-base"
                data-testid="payment-method-summary"
              >
                Tarjeta de regalo
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
