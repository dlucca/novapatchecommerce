import SubscriptionsList from "@modules/account/components/subscriptions-list"
import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { Subscription } from "@lib/data/subscriptions"

type SubscriptionsTemplateProps = {
  customer: HttpTypes.StoreCustomer | null
  subscriptions: Subscription[]
  countryCode: string
}

export default function SubscriptionsTemplate({
  customer,
  subscriptions,
  countryCode,
}: SubscriptionsTemplateProps) {
  const t = useTranslations("mySubscriptions")
  // If no customer, show empty state
  if (!customer) {
    return (
      <div className="w-full" data-testid="subscriptions-page-wrapper">
        <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">{t("title")}</h1>
          <p className="text-base-regular">{t("subtitle")}</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">{t("noSubscriptions")}</h3>
          <p className="text-gray-600 mb-4">{t("warning")}</p>
          <LocalizedClientLink
            href="/subscriptions"
            className="inline-block bg-novapatch-button text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-button/90 transition-colors"
          >
            {t("viewSubscription")}
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full" data-testid="subscriptions-page-wrapper">
      <SubscriptionsList customer={customer} subscriptions={subscriptions} />
    </div>
  )
}
