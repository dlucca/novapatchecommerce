import { logger } from "./logger"

interface MedusaErrorResponse {
  response?: {
    data: {
      message?: string
    } | string
    status: number
    headers: Record<string, string>
  }
  request?: unknown
  message?: string
  config?: {
    url: string
    baseURL: string
  }
}

export default function medusaError(error: MedusaErrorResponse | Error): never {
  if ('response' in error && error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.config) {
      const u = new URL(error.config.url, error.config.baseURL)
      logger.error(`Medusa API error at ${u.toString()}`, undefined, {
        context: 'MedusaError'
      })
      logger.debug("Response data:", error.response.data)
      logger.debug("Status code:", error.response.status)
    }

    // Extracting the error message from the response data
    const responseData = error.response.data
    const message = typeof responseData === 'object' && responseData.message 
      ? responseData.message 
      : String(responseData)

    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if ('request' in error && error.request) {
    // The request was made but no response was received
    logger.error("No response received from Medusa", undefined, {
      context: 'MedusaError'
    })
    throw new Error("No response received from the server.")
  } else {
    // Something happened in setting up the request that triggered an Error
    const message = error instanceof Error ? error.message : String(error)
    logger.error("Error setting up Medusa request", error as Error, {
      context: 'MedusaError'
    })
    throw new Error("Error setting up the request: " + message)
  }
}
