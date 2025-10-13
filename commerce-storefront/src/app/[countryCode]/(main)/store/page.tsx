import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreGridTemplate from "@modules/store/templates/store-grid-template"

export const metadata: Metadata = {
  title: "Productos - NovaPatch",
  description: "Explora nuestra colección de parches terapéuticos.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams
  const pageNumber = page ? parseInt(page) : 1

  return (
    <StoreGridTemplate
      sortBy={sortBy}
      page={pageNumber}
      countryCode={params.countryCode}
    />
  )
}
