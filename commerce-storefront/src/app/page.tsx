import { redirect } from 'next/navigation'
import { detectUserCountry } from '@lib/util/region-detection'

/**
 * Página raíz - Redirige automáticamente a la región detectada
 *
 * Esta página detecta el país del usuario y redirige a:
 * - /mx para usuarios de México
 * - /br para usuarios de Brasil
 *
 * La detección se basa en:
 * 1. Cookie de país guardada (si existe)
 * 2. Headers de geolocalización (Cloudflare)
 * 3. Accept-Language header
 * 4. Fallback a México
 */
export default async function RootPage() {
  const countryCode = await detectUserCountry()

  // Redirigir a la región detectada
  redirect(`/${countryCode}`)
}
