import { Metadata } from "next"
import SubscriptionsPageTemplate from "@modules/subscriptions/pages/subscriptions-page-template"

export const metadata: Metadata = {
  title: "Suscripciones - NovaPatch",
  description: "Suscríbete y ahorra en tus parches favoritos. Personaliza tu rutina de bienestar.",
}

export default function SubscriptionsPage() {
  return <SubscriptionsPageTemplate />
}
