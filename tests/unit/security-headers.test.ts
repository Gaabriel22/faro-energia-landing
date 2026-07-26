import { describe, expect, it } from "vitest"

import { contentSecurityPolicy, securityHeaders } from "@/lib/security-headers"

describe("security headers", () => {
  it("keeps the production CSP limited to the same origin", () => {
    expect(contentSecurityPolicy).toContain("default-src 'self'")
    expect(contentSecurityPolicy).toContain("frame-ancestors 'none'")
    expect(contentSecurityPolicy).toContain("object-src 'none'")
    expect(contentSecurityPolicy).toContain("form-action 'self'")
    expect(contentSecurityPolicy).not.toContain("https:")
    expect(contentSecurityPolicy).not.toContain("http:")
    expect(contentSecurityPolicy).not.toContain("'unsafe-eval'")
  })

  it("includes the required hardening policies", () => {
    expect(
      Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value])),
    ).toMatchObject({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
    })
  })
})
