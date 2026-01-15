import { checkRateLimit, getClientIP, RATE_LIMITS } from "../rate-limiter"

describe("Rate Limiter", () => {
  describe("checkRateLimit", () => {
    it("should allow first request", () => {
      const result = checkRateLimit("test-ip-1", {
        maxRequests: 5,
        windowSeconds: 60,
        keyPrefix: "test1",
      })

      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4)
    })

    it("should decrement remaining on subsequent requests", () => {
      const config = {
        maxRequests: 5,
        windowSeconds: 60,
        keyPrefix: "test2",
      }

      checkRateLimit("test-ip-2", config) // 1st request
      checkRateLimit("test-ip-2", config) // 2nd request
      const result = checkRateLimit("test-ip-2", config) // 3rd request

      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(2) // 5 - 3 = 2
    })

    it("should block when limit exceeded", () => {
      const config = {
        maxRequests: 3,
        windowSeconds: 60,
        keyPrefix: "test3",
      }

      checkRateLimit("test-ip-3", config) // 1st
      checkRateLimit("test-ip-3", config) // 2nd
      checkRateLimit("test-ip-3", config) // 3rd (last allowed)
      const result = checkRateLimit("test-ip-3", config) // 4th (blocked)

      expect(result.allowed).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it("should track different IPs separately", () => {
      const config = {
        maxRequests: 2,
        windowSeconds: 60,
        keyPrefix: "test4",
      }

      checkRateLimit("ip-a", config)
      checkRateLimit("ip-a", config)
      const resultA = checkRateLimit("ip-a", config) // blocked

      const resultB = checkRateLimit("ip-b", config) // different IP, allowed

      expect(resultA.allowed).toBe(false)
      expect(resultB.allowed).toBe(true)
    })

    it("should track different prefixes separately", () => {
      const configA = {
        maxRequests: 1,
        windowSeconds: 60,
        keyPrefix: "endpoint-a",
      }
      const configB = {
        maxRequests: 1,
        windowSeconds: 60,
        keyPrefix: "endpoint-b",
      }

      checkRateLimit("same-ip", configA) // use up limit for endpoint-a
      const resultA = checkRateLimit("same-ip", configA) // blocked

      const resultB = checkRateLimit("same-ip", configB) // different endpoint, allowed

      expect(resultA.allowed).toBe(false)
      expect(resultB.allowed).toBe(true)
    })
  })

  describe("getClientIP", () => {
    it("should extract IP from x-forwarded-for header", () => {
      const req = {
        headers: {
          "x-forwarded-for": "192.168.1.1, 10.0.0.1",
        },
      }

      expect(getClientIP(req)).toBe("192.168.1.1")
    })

    it("should extract IP from x-real-ip header", () => {
      const req = {
        headers: {
          "x-real-ip": "192.168.1.2",
        },
      }

      expect(getClientIP(req)).toBe("192.168.1.2")
    })

    it("should fallback to connection remoteAddress", () => {
      const req = {
        headers: {},
        connection: {
          remoteAddress: "192.168.1.3",
        },
      }

      expect(getClientIP(req)).toBe("192.168.1.3")
    })

    it("should return 'unknown' when no IP available", () => {
      const req = {
        headers: {},
      }

      expect(getClientIP(req)).toBe("unknown")
    })
  })

  describe("RATE_LIMITS config", () => {
    it("should have createCustomer config", () => {
      expect(RATE_LIMITS.createCustomer).toBeDefined()
      expect(RATE_LIMITS.createCustomer.maxRequests).toBe(10)
      expect(RATE_LIMITS.createCustomer.windowSeconds).toBe(60)
    })

    it("should have webhooks config with higher limit", () => {
      expect(RATE_LIMITS.webhooks).toBeDefined()
      expect(RATE_LIMITS.webhooks.maxRequests).toBe(100)
    })
  })
})

