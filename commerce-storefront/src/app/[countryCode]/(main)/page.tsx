import { Metadata } from "next"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { logger } from "@lib/util/logger"
import { featureFlags } from "@lib/feature-flags"
import HomeTemplate from "@modules/home/pages/home-template"

export const metadata: Metadata = {
  title: "Novapatch - Parches de Bienestar Natural",
  description: "Activa tu bienestar con nuestros parches transdérmicos. La forma más limpia y práctica de incorporar vitaminas y minerales a tu rutina diaria.",
}

type PageProps = {
  params: { countryCode: string }
}

export default async function Home({ params }: PageProps) {
  const { countryCode } = params
  const region = await getRegion(countryCode)

  // Obtener colecciones si están habilitadas
  let collections = null
  if (featureFlags.ENABLE_COLLECTIONS && region) {
    try {
      const result = await listCollections({
        fields: "id, handle, title",
      })
      collections = result.collections
    } catch (error) {
      logger.error("Failed to load collections", error as Error, { context: 'HomePage' })
    }
  }

  return (
    <HomeTemplate
      collections={collections}
      region={region}
      showFeaturedProducts={featureFlags.ENABLE_PRODUCTS}
    />
  )
}
