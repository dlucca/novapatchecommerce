"use client"

import { useTranslations } from "next-intl"

export default function AboutStorySection() {
  const t = useTranslations("about.story")

  return (
    <section className="bg-[#FEF7ED] py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="leading-tight text-novapatch-title">
            {t("title")}
          </h2>
        </div>

        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <p className="text-gray-900 text-lg leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: t.raw("paragraph1") }} />
          </p>
          <p className="text-gray-900 text-lg leading-relaxed">
            {t("paragraph2")}
          </p>
          <p className="text-gray-900 text-lg leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: t.raw("paragraph3") }} />
          </p>
          <p className="text-gray-900 text-lg leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: t.raw("paragraph4") }} />
          </p>
        </div>
      </div>
    </section>
  )
}
