import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="cart-container">
        {cart?.items?.length ? (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Mi Carrito</h1>
              <p className="text-gray-600 mt-2">
                {cart.items.length} {cart.items.length === 1 ? 'producto' : 'productos'} en tu carrito
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
                      <Summary cart={cart as any} />
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
