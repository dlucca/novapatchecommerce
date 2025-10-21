export function transformMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
  
  if (url.startsWith('http://localhost:9000')) {
    return url.replace('http://localhost:9000', backendUrl)
  }
  
  if (url.startsWith('/')) {
    return `${backendUrl}${url}`
  }
  
  return url
}
