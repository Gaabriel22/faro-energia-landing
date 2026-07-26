import { describe, expect, it } from "vitest"

import { faroLandingContent } from "@/content"
import { createFaroJsonLd } from "@/lib/faro-json-ld"
import { serializeJsonLd } from "@/lib/json-ld"
import { LOCAL_SITE_URL, resolveSiteUrl } from "@/lib/site-url"

describe("SEO helpers", () => {
  it("normalizes a valid SITE_URL to its origin", () => {
    expect(
      resolveSiteUrl("https://portfolio.example/faro?ref=test#hero").href,
    ).toBe("https://portfolio.example/")
  })

  it.each([
    "",
    "not-a-url",
    "javascript:alert(1)",
    "https://user:password@example.com",
  ])("falls back safely for an invalid SITE_URL: %s", (value) => {
    expect(resolveSiteUrl(value).href).toBe(`${LOCAL_SITE_URL}/`)
  })

  it("escapes characters that could break out of a JSON-LD script", () => {
    const serialized = serializeJsonLd({
      value: "</script><script>alert('xss')</script>&\u2028\u2029",
    })

    expect(serialized).not.toContain("<")
    expect(serialized).not.toContain(">")
    expect(serialized).not.toContain("&")
    expect(serialized).toContain("\\u003c/script\\u003e")
    expect(JSON.parse(serialized).value).toContain("</script>")
  })

  it("keeps structured data aligned with visible FAQ content", () => {
    const graph = createFaroJsonLd()["@graph"]
    const types = graph.map((item) => item["@type"])
    const faq = graph.find((item) => item["@type"] === "FAQPage")

    expect(types).toEqual(["WebSite", "Organization", "Service", "FAQPage"])
    expect(faq?.mainEntity).toHaveLength(faroLandingContent.faq.items.length)
    expect(faq?.mainEntity).toEqual(
      faroLandingContent.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    )
  })
})
