import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

const PAGE_SIZE = 50

type ProductImage = {
  url: string
  rank?: number
  created_at?: string | Date
  updated_at?: string | Date
}

const getImageTimestamp = (image: ProductImage): number => {
  const updated = image.updated_at ? new Date(image.updated_at).getTime() : 0
  if (updated) return updated
  const created = image.created_at ? new Date(image.created_at).getTime() : 0
  return created
}

const pickPreferredImage = (images: ProductImage[]): ProductImage | undefined => {
  if (!images.length) return undefined

  return [...images].sort((a, b) => {
    const timeDiff = getImageTimestamp(b) - getImageTimestamp(a)
    if (timeDiff !== 0) return timeDiff
    return (b.rank ?? 0) - (a.rank ?? 0)
  })[0]
}

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const productModuleService = req.scope.resolve(Modules.PRODUCT)

  let offset = 0
  let updated = 0
  let scanned = 0
  let total = 0

  do {
    const [products, count] = await productModuleService.listAndCountProducts(
      {},
      {
        relations: ["images"],
        take: PAGE_SIZE,
        skip: offset,
      }
    )

    total = count
    if (!products.length) break

    for (const product of products as any[]) {
      scanned += 1
      const images = (product.images || []) as ProductImage[]
      const preferred = pickPreferredImage(images)

      if (!preferred?.url) {
        continue
      }

      if (product.thumbnail !== preferred.url) {
        await productModuleService.updateProducts(product.id, {
          thumbnail: preferred.url,
        })
        updated += 1
      }
    }

    offset += PAGE_SIZE
  } while (offset < total)

  res.status(200).json({ scanned, updated, total })
}
