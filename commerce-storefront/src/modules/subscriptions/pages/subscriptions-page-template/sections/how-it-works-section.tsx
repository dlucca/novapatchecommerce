import { Heading, Text } from "@medusajs/ui"
import { useTranslations } from "next-intl"

export default function SubscriptionsHowItWorksSection() {
  const t = useTranslations("subscriptions.howItWorks")
  return (
    <div className="bg-novapatch-bg-light py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
          {t("title")}
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              1
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              {t("step1Title")}
            </Heading>
            <Text className="text-gray-600">
              {t("step1Description")}
            </Text>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              2
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              {t("step2Title")}
            </Heading>
            <Text className="text-gray-600">
              {t("step2Description")}
            </Text>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              3
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              {t("step3Title")}
            </Heading>
            <Text className="text-gray-600">
              {t("step3Description")}
            </Text>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-novapatch-button rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
              4
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              {t("step4Title")}
            </Heading>
            <Text className="text-gray-600">
              {t("step4Description")}
            </Text>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <Text className="text-gray-700 text-lg leading-relaxed">
            {t("finalNote")} <span className="font-semibold text-novapatch-button">{t("finalNoteHighlight")}</span>, 
            {t("finalNoteEnd")}
          </Text>
        </div>
      </div>
    </div>
  )
}

