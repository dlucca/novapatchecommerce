/**
 * Simple in-memory rate limiter
 * For production with multiple instances, use Redis-based rate limiting
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Time window in seconds */
  windowSeconds: number
  /** Key prefix for namespacing different endpoints */
  keyPrefix?: string
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetIn: number // seconds until reset
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowSeconds, keyPrefix = "" } = config
  const key = `${keyPrefix}:${identifier}`
  const now = Date.now()
  const windowMs = windowSeconds * 1000

  const entry = rateLimitStore.get(key)

  if (!entry || entry.resetTime < now) {
    // First request or window expired, create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetIn: windowSeconds,
    }
  }

  // Increment count
  entry.count++

  if (entry.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  }
}

/**
 * Get client IP from request headers
 * Handles proxies and load balancers
 */
export function getClientIP(req: any): string {
  const forwarded = req.headers["x-forwarded-for"]
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim()
  }
  
  return (
    req.headers["x-real-ip"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    "unknown"
  )
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Create customer: 10 requests per minute per IP
  createCustomer: {
    maxRequests: 10,
    windowSeconds: 60,
    keyPrefix: "create-customer",
  },
  // Webhooks: 100 requests per minute per IP (higher limit for payment processors)
  webhooks: {
    maxRequests: 100,
    windowSeconds: 60,
    keyPrefix: "webhooks",
  },
  // General API: 60 requests per minute per IP
  general: {
    maxRequests: 60,
    windowSeconds: 60,
    keyPrefix: "general",
  },
} as const

