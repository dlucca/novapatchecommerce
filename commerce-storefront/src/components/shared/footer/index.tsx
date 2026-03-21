"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactModal from "@/components/shared/contact-modal"

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const t = useTranslations("footer")
  const tCommon = useTranslations("common")

  return (
    <>
      <ContactModal
        isOpen={isContactModalOpen}
        close={() => setIsContactModalOpen(false)}
      />

      <footer className="w-full bg-novapatch-footer overflow-hidden">
        <div
          className="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32"
          style={{
            paddingTop: "clamp(2.5rem, 4vw, 4rem)",
            paddingBottom: "clamp(2.5rem, 4vw, 4rem)",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-start"
            style={{ gap: "clamp(2rem, 3vw, 3rem)" }}
          >
            <div
              className="flex flex-col"
              style={{ gap: "clamp(0.5rem, 0.75vw, 0.75rem)" }}
            >
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                  marginBottom: "clamp(0.25rem, 0.75vw, 0.75rem)",
                }}
              >
                {t("shop")}
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.375rem, 0.5vw, 0.5rem)",
                }}
              >
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("shop")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/subscriptions"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("welfares")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/subscriptions"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("protection")}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div
              className="flex flex-col"
              style={{ gap: "clamp(0.5rem, 0.75vw, 0.75rem)" }}
            >
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                  marginBottom: "clamp(0.25rem, 0.75vw, 0.75rem)",
                }}
              >
                {t("help")}
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.375rem, 0.5vw, 0.5rem)",
                }}
              >
                <li>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm text-left"
                  >
                    {t("contact")}
                  </button>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/subscriptions"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("faq")}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div
              className="flex flex-col"
              style={{ gap: "clamp(0.5rem, 0.75vw, 0.75rem)" }}
            >
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                  marginBottom: "clamp(0.25rem, 0.75vw, 0.75rem)",
                }}
              >
                {t("about")}
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.375rem, 0.5vw, 0.5rem)",
                }}
              >
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("about")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("whyChooseUs")}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/subscriptions"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {t("subscribeAndSave")}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div
              className="flex flex-col"
              style={{ gap: "clamp(0.5rem, 0.75vw, 0.75rem)" }}
            >
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                  marginBottom: "clamp(0.25rem, 0.75vw, 0.75rem)",
                }}
              >
                Legal
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.375rem, 0.5vw, 0.5rem)",
                }}
              >
                <li>
                  <LocalizedClientLink
                    href="/legal/privacidad"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Aviso de Privacidad
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/legal/terminos"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Términos y Condiciones
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div
              className="flex flex-col items-end justify-start"
              style={{ gap: "clamp(1.25rem, 1.5vw, 1.5rem)" }}
            >
              <div>
                <LocalizedClientLink
                  href="/subscribe"
                  className="inline-block bg-white text-blue-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-xs sm:text-sm shadow-md"
                  style={{
                    padding:
                      "clamp(0.375rem, 0.5vw, 0.5rem) clamp(1.25rem, 1.5vw, 1.5rem)",
                  }}
                >
                  {t("subscribe")}
                </LocalizedClientLink>
              </div>

              <div
                className="flex"
                style={{ gap: "clamp(0.75rem, 1vw, 1rem)" }}
              >
                <a
                  href="https://instagram.com/novapatch.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  aria-label={tCommon("instagramLabel")}
                >
                  <svg
                    className="w-[clamp(28px,3vw,32px)] h-[clamp(28px,3vw,32px)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@novapatch.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  aria-label={tCommon("tiktokLabel")}
                >
                  <svg
                    className="w-[clamp(28px,3vw,32px)] h-[clamp(28px,3vw,32px)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} {t("reserve")}
          </p>
        </div>
      </footer>
    </>
  )
}
