import { Metadata } from "next"
import { redirect } from "next/navigation"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Productos - NovaPatch",
  description: "Explora nuestra colección de parches terapéuticos.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  
  const { response } = await listProducts({
    countryCode: params.countryCode,
    queryParams: { limit: 1 },
  })
  
  const firstProduct = response.products[0]
  const defaultHandle = firstProduct?.handle || "zencore-patch"
  
  // Redirigir a /store/[handle]
  redirect(`/${params.countryCode}/store/${defaultHandle}`)
}
