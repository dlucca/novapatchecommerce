import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreGridClient from "./store-grid-client"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function StoreGridTemplate({
  sortBy,
  page,
  countryCode,
  selectedHandle,
}: {
  sortBy?: SortOptions
  page: number
  countryCode: string
  selectedHandle?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <StoreGridClient
      products={products}
      region={region}
      countryCode={countryCode}
      currentPage={page}
      totalPages={totalPages}
      selectedHandle={selectedHandle}
    />
  )
}

