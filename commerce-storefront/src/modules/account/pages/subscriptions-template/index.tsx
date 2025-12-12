import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SubscriptionsList from "@modules/account/components/subscriptions-list"
import { HttpTypes } from "@medusajs/types"

type SubscriptionsTemplateProps = {
  customer: HttpTypes.StoreCustomer | null
  subscriptions: any[] // TODO: Type this properly when subscription type is defined
  countryCode: string
}

export default function SubscriptionsTemplate({
  customer,
  subscriptions,
  countryCode,
}: SubscriptionsTemplateProps) {
  // If no customer, show empty state
  if (!customer) {
    return (
      <div className="w-full" data-testid="subscriptions-page-wrapper">
        <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Mis Suscripciones</h1>
          <p className="text-base-regular">
            Gestiona tus suscripciones activas.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            No tienes suscripciones activas
          </h3>
          <p className="text-gray-600 mb-4">
            Suscríbete a nuestros productos y recibe envíos automáticos con descuentos exclusivos.
          </p>
          <LocalizedClientLink
            href="/subscriptions"
            className="inline-block bg-novapatch-button text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-button/90 transition-colors"
          >
            Ver Planes de Suscripción
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full" data-testid="subscriptions-page-wrapper">
      <SubscriptionsList 
        customer={customer}
        subscriptions={subscriptions}
      />
    </div>
  )
}

