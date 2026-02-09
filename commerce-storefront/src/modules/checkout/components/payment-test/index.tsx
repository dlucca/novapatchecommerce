import { Badge } from "@medusajs/ui"

import { useTranslations } from "next-intl"
import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  const t = useTranslations("checkout")
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">{t("paymentTest.attention")}</span>{" "}
      {t("paymentTest.message")}
    </Badge>
  )
}

export default PaymentTest
