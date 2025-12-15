import ProfileDeleteAccount from "@modules/account/components/profile-delete-account"
import { useTranslations } from "next-intl"
import { Heading, Text } from "@medusajs/ui"

type ProfileTemplateProps = {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export default function ProfileTemplate({
  email,
  firstName,
  lastName,
  phone,
}: ProfileTemplateProps) {
  const t = useTranslations("myAccount")
  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("title")}</h1>
        <p className="text-base-regular">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">
            {t("name")}
          </Heading>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="text-sm text-gray-600 mb-1">{t("name")}</Text>
              <Text className="text-base">
                {firstName || t("notSpecified")}
              </Text>
            </div>
            <div>
              <Text className="text-sm text-gray-600 mb-1">
                {t("lastName")}
              </Text>
              <Text className="text-base">{lastName || t("notSpecified")}</Text>
            </div>
          </div>
        </div>

        <Divider />
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">
            {t("email")}
          </Heading>
          <Text className="text-base">{email}</Text>
        </div>

        <Divider />
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">
            {t("phone")}
          </Heading>
          <Text className="text-base">{phone || t("notSpecified")}</Text>
        </div>

        <Divider />
        <ProfileDeleteAccount />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
