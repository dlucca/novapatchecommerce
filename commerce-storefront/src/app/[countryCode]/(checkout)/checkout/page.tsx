import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getRegion } from "@lib/data/regions"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/pages/checkout-form"
import CheckoutSummary from "@modules/checkout/pages/checkout-summary"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout | Novapatch",
}

export default async function Checkout({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  // Check if cart region matches the current country
  const region = await getRegion(countryCode)
  if (region && cart.region_id !== region.id) {
    // Region mismatch - redirect to cart page to update region
    redirect(`/${countryCode}/cart`)
  }

  const customer = await retrieveCustomer()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] content-container gap-8 py-8">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}
