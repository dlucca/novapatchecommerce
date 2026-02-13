import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { useTranslations } from "next-intl"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const t = useTranslations("cart")
  return (
    <div className="min-h-screen bg-novapatch-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="cart-container">
        {cart?.items?.length ? (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-gray-600 mt-2">
                {cart.items.length} {cart.items.length === 1 ? t("product") : t("products")} {t("itemsInCart")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              <div className="flex flex-col gap-y-6">
                {!customer && (
                  <>
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <SignInPrompt />
                    </div>
                  </>
                )}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <ItemsTemplate cart={cart} />
                </div>
              </div>

              <div className="relative">
                <div className="sticky top-24">
                  {cart && cart.region && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <Summary
                        cart={
                          cart as HttpTypes.StoreCart & {
                            promotions: HttpTypes.StorePromotion[]
                          }
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  )
}

export default CartTemplate
