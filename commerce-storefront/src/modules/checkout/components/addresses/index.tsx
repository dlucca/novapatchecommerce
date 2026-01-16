"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Heading
            level="h2"
            className="text-[#0A4C6D] text-xl font-semibold"
          >
            Dirección de Envío
          </Heading>
          {!isOpen && cart?.shipping_address && (
            <div className="w-2.5 h-2.5 bg-[#22b2bd] rounded-full"></div>
          )}
        </div>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-[#22b2bd] text-base hover:underline font-medium"
            data-testid="edit-address-button"
          >
            Editar
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-4">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-[#0A4C6D] text-lg font-medium gap-x-4 pb-6 pt-8"
                >
                  Dirección de Facturación
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton
              className="mt-6 w-full bg-[#22b2bd] hover:bg-[#1a9aa5] text-white text-base font-medium py-3 rounded-full border-0 shadow-none"
              data-testid="submit-address-button"
            >
              Continuar con la Entrega
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-base">
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="flex flex-col"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-gray-500 mb-2 text-base">
                    Dirección de Envío
                  </Text>
                  <Text className="text-[#0A4C6D] font-medium text-base">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="text-gray-700 text-base">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="text-gray-700 text-base">
                    {cart.shipping_address.city},{" "}
                    {cart.shipping_address.province}
                  </Text>
                  <Text className="text-gray-700 text-base">
                    {cart.shipping_address.postal_code}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-gray-500 mb-2 text-base">
                    Contacto
                  </Text>
                  <Text className="text-[#0A4C6D] font-medium text-base">
                    {cart.shipping_address.phone}
                  </Text>
                  <Text className="text-gray-700 text-base">
                    {cart.email}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-gray-500 mb-2 text-base">
                    Dirección de Facturación
                  </Text>

                  {sameAsBilling ? (
                    <Text className="text-gray-700 text-base">
                      La dirección de envío y facturación son las mismas.
                    </Text>
                  ) : (
                    <>
                      <Text className="text-[#0A4C6D] font-medium text-base">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-gray-700 text-base">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="text-gray-700 text-base">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text className="text-gray-700 text-base">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Addresses
