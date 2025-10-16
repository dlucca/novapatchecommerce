/**
 * Centralized logging utility
 * Logs are only shown in development mode by default
 * Error logs are always shown for monitoring purposes
 */

const isDev = process.env.NODE_ENV === 'development'
const isClient = typeof window !== 'undefined'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogOptions {
  force?: boolean // Force log even in production
  context?: string // Additional context
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString()
    const prefix = context ? `[${context}]` : ''
    return `${timestamp} [${level.toUpperCase()}] ${prefix} ${message}`
  }

  /**
   * Debug level - only in development
   */
  debug(message: string, ...args: any[]): void {
    if (isDev) {
      console.log(`🔍 ${message}`, ...args)
    }
  }

  /**
   * Info level - only in development
   */
  info(message: string, ...args: any[]): void {
    if (isDev) {
      console.info(`ℹ️  ${message}`, ...args)
    }
  }

  /**
   * Warning level - only in development unless forced
   */
  warn(message: string, options?: LogOptions, ...args: any[]): void {
    if (isDev || options?.force) {
      const formatted = this.formatMessage('warn', message, options?.context)
      console.warn(`⚠️  ${formatted}`, ...args)
    }
  }

  /**
   * Error level - always logged for monitoring
   */
  error(message: string, error?: Error | unknown, options?: LogOptions): void {
    const formatted = this.formatMessage('error', message, options?.context)
    console.error(`❌ ${formatted}`, error)
    
    // In production, you might want to send to error tracking service
    if (!isDev && isClient) {
      // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
      // this.sendToErrorTracking(message, error)
    }
  }

  /**
   * Success level - only in development
   */
  success(message: string, ...args: any[]): void {
    if (isDev) {
      console.log(`✅ ${message}`, ...args)
    }
  }

  /**
   * Performance measurement
   */
  time(label: string): void {
    if (isDev) {
      console.time(label)
    }
  }

  timeEnd(label: string): void {
    if (isDev) {
      console.timeEnd(label)
    }
  }

  /**
   * Group logs
   */
  group(label: string): void {
    if (isDev) {
      console.group(label)
    }
  }

  groupEnd(): void {
    if (isDev) {
      console.groupEnd()
    }
  }
}

export const logger = new Logger()

// Export a simpler interface for common use cases
export const log = {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  success: logger.success.bind(logger),
}
