import { expect, test } from "./fixtures"

test("serves restrictive security headers without breaking hydration", async ({
  page,
}) => {
  const response = await page.goto("/")
  expect(response).not.toBeNull()

  const headers = response!.headers()
  const csp = headers["content-security-policy"]

  expect(csp).toContain("default-src 'self'")
  expect(csp).toContain("base-uri 'self'")
  expect(csp).toContain("form-action 'self'")
  expect(csp).toContain("frame-ancestors 'none'")
  expect(csp).toContain("object-src 'none'")
  expect(csp).toContain("connect-src 'self'")
  expect(csp).not.toContain("'unsafe-eval'")
  expect(csp).not.toContain("https:")
  expect(csp).not.toContain("http:")
  expect(headers["x-content-type-options"]).toBe("nosniff")
  expect(headers["x-frame-options"]).toBe("DENY")
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin")
  expect(headers["permissions-policy"]).toBe(
    "camera=(), geolocation=(), microphone=(), payment=(), usb=(), browsing-topics=()",
  )
  expect(headers["cross-origin-opener-policy"]).toBe("same-origin")
  expect(headers["x-powered-by"]).toBeUndefined()

  await page.locator("#simulador").scrollIntoViewIfNeeded()
  await page.getByRole("button", { name: "Calcular economia" }).click()
  await expect(
    page.getByRole("status", { name: "Resultado da estimativa" }),
  ).toContainText("R$ 2.000")
})
