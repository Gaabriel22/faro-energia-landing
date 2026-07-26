import { expect, test } from "./fixtures"

test("serves indexable metadata and a shareable social image", async ({
  page,
}) => {
  await page.goto("/")

  await expect(page).toHaveTitle(
    "Energia solar para pequenos negócios | Faro Energia",
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /energia solar para pequenos negócios/,
  )
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href")
  expect(new URL(canonical!).href).toBe("http://localhost:3000/")
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  )
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "pt_BR",
  )
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  )

  const socialImageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content")

  expect(socialImageUrl).not.toBeNull()
  expect(new URL(socialImageUrl!).pathname).toBe(
    "/images/social/faro-social.jpg",
  )

  const imageResponse = await page.request.get(
    new URL(socialImageUrl!).pathname,
  )
  expect(imageResponse.ok()).toBe(true)
  expect(imageResponse.headers()["content-type"]).toContain("image/jpeg")
  expect((await imageResponse.body()).byteLength).toBeLessThan(200 * 1024)

  const dimensions = await page.evaluate(async (src) => {
    const image = new Image()
    image.src = src
    await image.decode()

    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
    }
  }, new URL(socialImageUrl!).pathname)

  expect(dimensions).toEqual({ width: 1200, height: 630 })
})

test("serves crawl directives, sitemap, favicon, and visible structured data", async ({
  page,
}) => {
  await page.goto("/")

  const robots = await page.request.get("/robots.txt")
  const robotsText = await robots.text()
  expect(robots.ok()).toBe(true)
  expect(robotsText).toContain("User-Agent: *")
  expect(robotsText).toContain("Allow: /")
  expect(robotsText).toContain("Sitemap: http://localhost:3000/sitemap.xml")

  const sitemap = await page.request.get("/sitemap.xml")
  const sitemapText = await sitemap.text()
  expect(sitemap.ok()).toBe(true)
  expect(sitemapText).toContain("<loc>http://localhost:3000/</loc>")

  const favicon = await page.request.get("/icon.svg")
  expect(favicon.ok()).toBe(true)
  expect(favicon.headers()["content-type"]).toContain("image/svg+xml")

  const serialized = await page.locator("#faro-structured-data").textContent()
  const structuredData = JSON.parse(serialized!)
  const graph = structuredData["@graph"] as Array<{
    "@type": string
    mainEntity?: unknown[]
  }>

  expect(graph.map((item) => item["@type"])).toEqual([
    "WebSite",
    "Organization",
    "Service",
    "FAQPage",
  ])
  expect(
    graph.find((item) => item["@type"] === "FAQPage")?.mainEntity,
  ).toHaveLength(await page.locator("#duvidas details").count())
})
