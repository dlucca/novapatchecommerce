import { Heading, Text } from "@medusajs/ui"
import { useTranslations } from "next-intl"

export default function AddressesTemplate() {
  // TODO: Fetch addresses from Medusa and pass as props
  const t = useTranslations("deliveryDirections")
  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("title")}</h1>
        <p className="text-base-regular">{t("subtitle")}</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Heading level="h3" className="text-lg font-semibold mb-2">
          {t("notSavedAddresses")}
        </Heading>
        <Text className="text-gray-600">{t("warning")}</Text>
      </div>
    </div>
  )
}
