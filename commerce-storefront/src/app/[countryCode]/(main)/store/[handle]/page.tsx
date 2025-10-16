import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { logger } from "@lib/util/logger"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreGridTemplate from "@modules/store/templates/store-grid-template"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    logger.error(
      "Failed to generate static paths for store pages",
      error as Error,
      { context: 'StorePage' }
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    return {
      title: "Productos - NovaPatch",
      description: "Explora nuestra colección de parches terapéuticos.",
    }
  }

  return {
    title: `${product.title} | NovaPatch`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | NovaPatch`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function StorePage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams
  const pageNumber = page ? parseInt(page) : 1

  return (
    <StoreGridTemplate
      sortBy={sortBy}
      page={pageNumber}
      countryCode={params.countryCode}
      selectedHandle={params.handle}
    />
  )
}
