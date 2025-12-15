import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"

type OrdersTemplateProps = {
  countryCode: string
}

export default function OrdersTemplate({ countryCode }: OrdersTemplateProps) {
  // TODO: Fetch orders from Medusa and pass as props
  const t = useTranslations("myOrders")
  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("title")}</h1>
        <p className="text-base-regular">{t("subtitle")}</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Heading level="h3" className="text-lg font-semibold mb-2">
          {t("noOrders")}
        </Heading>
        <Text className="text-gray-600 mb-4">{t("warning")}</Text>
        <LocalizedClientLink
          href="/store/zencore-patch"
          className="inline-block bg-novapatch-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-novapatch-primary/90 transition-colors"
        >
          {t("goToStore")}
        </LocalizedClientLink>
      </div>
    </div>
  )
}
