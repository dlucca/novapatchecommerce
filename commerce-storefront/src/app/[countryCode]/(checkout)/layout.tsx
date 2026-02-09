import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@/components/shared/medusa-cta"
import { useTranslations } from "next-intl"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations("checkout")
  const tCommon = useTranslations("common")
  return (
    <div className="w-full bg-[#FFF8F0] relative small:min-h-screen font-outfit">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-x-2 uppercase flex-1 basis-0 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block text-sm font-medium tracking-wide">
              {t("header.backToCart").toUpperCase()}
            </span>
            <span className="mt-px block small:hidden text-sm font-medium">
              {t("header.back")}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center"
            data-testid="store-link"
          >
            <Image
              src="/assets/nav/LOGO-1.svg"
              alt={tCommon("brandLogoAlt")}
              width={140}
              height={40}
              priority
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div>
  )
}
