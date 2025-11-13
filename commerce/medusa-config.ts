
import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const isProduction = process.env.NODE_ENV === 'production'
const hasRedis = !!process.env.REDIS_URL

/**
 * Validate critical environment variables on startup
 */
function validateEnvironmentVariables() {
  const warnings: string[] = []
  const errors: string[] = []

  // Required variables
  const requiredEnvs = [
    { key: 'DATABASE_URL', description: 'PostgreSQL database connection' },
    { key: 'JWT_SECRET', description: 'JWT token secret' },
    { key: 'COOKIE_SECRET', description: 'Cookie encryption secret' },
  ]

  // Optional but recommended variables
  const optionalEnvs = [
    { key: 'RESEND_API_KEY', feature: 'Email notifications (welcome, orders, etc.)' },
    { key: 'REDIS_URL', feature: 'Redis cache and event bus (recommended for production)' },
    { key: 'CLERK_SECRET_KEY', feature: 'Clerk authentication' },
  ]

  // Check required variables
  requiredEnvs.forEach(env => {
    if (!process.env[env.key]) {
      errors.push(`❌ ${env.key} is required - ${env.description}`)
    }
  })

  // Check optional variables
  optionalEnvs.forEach(env => {
    if (!process.env[env.key]) {
      warnings.push(`⚠️  ${env.key} not configured - ${env.feature} will be disabled`)
    }
  })

  // Validate Resend API Key format if present
  if (process.env.RESEND_API_KEY) {
    if (!process.env.RESEND_API_KEY.startsWith('re_')) {
      warnings.push('⚠️  RESEND_API_KEY does not have expected format (should start with "re_")')
    }
  }

  // Validate production-specific requirements
  if (isProduction) {
    if (!hasRedis) {
      warnings.push('⚠️  REDIS_URL not configured - Using in-memory cache (not recommended for production)')
    }
    if (process.env.JWT_SECRET === 'supersecret' || process.env.COOKIE_SECRET === 'supersecret') {
      errors.push('❌ JWT_SECRET and COOKIE_SECRET must be changed from default values in production')
    }
  }

  // Log warnings
  if (warnings.length > 0) {
    console.warn('\n' + '='.repeat(80))
    console.warn('⚠️  ENVIRONMENT CONFIGURATION WARNINGS')
    console.warn('='.repeat(80))
    warnings.forEach(warning => console.warn(warning))
    console.warn('='.repeat(80) + '\n')
  }

  // Throw errors if any critical variables are missing
  if (errors.length > 0) {
    console.error('\n' + '='.repeat(80))
    console.error('❌ ENVIRONMENT CONFIGURATION ERRORS')
    console.error('='.repeat(80))
    errors.forEach(error => console.error(error))
    console.error('='.repeat(80) + '\n')
    throw new Error('Missing required environment variables. Please check your .env file.')
  }
}

// Validate environment variables on startup
validateEnvironmentVariables()

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    workerMode: (process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server") || "shared",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000,http://localhost:7001",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseLogging: !isProduction,
    databaseDriverOptions: isProduction ? {
      connection: {
        ssl: false,
      },
      pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 60000,
        idleTimeoutMillis: 30000,
      },
    } : undefined,
  },
  modules: isProduction && hasRedis ? [
    { resolve: "@medusajs/medusa/cache-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/event-bus-redis", options: { redisUrl: process.env.REDIS_URL } },
    { resolve: "@medusajs/medusa/workflow-engine-redis", options: { redis: { url: process.env.REDIS_URL } } },
  ] : [],
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },
})
