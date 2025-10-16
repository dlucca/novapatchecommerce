import { Metadata } from "next"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
    title: "Productos - NovaPatch",
    description: "Explora nuestra colección de parches terapéuticos.",
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  
  redirect(`/${params.countryCode}/store/${params.handle}`)
}
