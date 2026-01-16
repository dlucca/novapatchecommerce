"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex flex-row items-center justify-between mb-5">
        <Heading
          level="h2"
          className={clx(
            "text-[#0A4C6D] text-xl font-semibold",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Revisión
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="text-gray-600 text-base leading-relaxed">
                Al hacer clic en el botón Realizar Pedido, confirmas que has
                leído, comprendido y aceptas nuestros{" "}
                <a href="/terms" className="text-[#22b2bd] hover:underline">Términos de Uso</a>,{" "}
                <a href="/terms" className="text-[#22b2bd] hover:underline">Términos de Venta</a> y{" "}
                <a href="/terms" className="text-[#22b2bd] hover:underline">Política de Devoluciones</a>,{" "}
                y confirmas que has leído la{" "}
                <a href="/privacy" className="text-[#22b2bd] hover:underline">Política de Privacidad</a>{" "}
                de Novapatch Store.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
