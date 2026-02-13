export function transformMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

  if (url.startsWith('/')) {
    return `${backendUrl}${url}`
  }

  return `${backendUrl}/${url}`
}
