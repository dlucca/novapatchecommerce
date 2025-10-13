import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getRegion } from "@lib/data/regions"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const countryCode = searchParams.get("countryCode") || "mx"

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ products: [] })
  }

  try {
    const region = await getRegion(countryCode)

    if (!region) {
      return NextResponse.json({ products: [] })
    }

    const response = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[]
      count: number
    }>("/store/products", {
      method: "GET",
      query: {
        q: query,
        region_id: region.id,
        limit: 10,
        fields: "*variants.calculated_price,+variants.inventory_quantity,*images",
      },
      cache: "no-store",
    })

    return NextResponse.json({
      products: response.products || [],
      count: response.count || 0,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ products: [], error: "Search failed" }, { status: 500 })
  }
}

