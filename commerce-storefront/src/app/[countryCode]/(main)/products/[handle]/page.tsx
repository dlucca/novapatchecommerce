import { Metadata } from "next"
import { redirect } from "next/navigation"

type PageProps = {
  params: { countryCode: string; handle: string }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Productos - NovaPatch",
    description: "Explora nuestra colección de parches terapéuticos.",
  }
}

export default async function ProductPage({ params }: PageProps) {
  redirect(`/${params.countryCode}/store/${params.handle}`)
}
