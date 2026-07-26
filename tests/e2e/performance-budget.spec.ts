import { performanceBudgets } from "./performance-budgets"
import { expect, test } from "./fixtures"

type Resource = {
  encodedDataLength: number
  type: string
  url: string
}

test("stays within transferred JavaScript and visual asset budgets", async ({
  page,
}) => {
  const client = await page.context().newCDPSession(page)
  const resources = new Map<string, Resource>()

  client.on("Network.responseReceived", ({ requestId, response, type }) => {
    resources.set(requestId, {
      encodedDataLength: 0,
      type,
      url: response.url,
    })
  })

  client.on("Network.loadingFinished", ({ encodedDataLength, requestId }) => {
    const resource = resources.get(requestId)

    if (resource) {
      resource.encodedDataLength = encodedDataLength
    }
  })

  await client.send("Network.enable")
  await client.send("Network.setCacheDisabled", { cacheDisabled: true })
  await page.goto("/", { waitUntil: "networkidle" })

  const origin = new URL(page.url()).origin
  const sameOriginJavaScriptBytes = [...resources.values()]
    .filter(
      (resource) =>
        resource.type === "Script" && resource.url.startsWith(`${origin}/`),
    )
    .reduce((total, resource) => total + resource.encodedDataLength, 0)
  const sameOriginJavaScriptReport = [...resources.values()]
    .filter(
      (resource) =>
        resource.type === "Script" && resource.url.startsWith(`${origin}/`),
    )
    .map(
      (resource) =>
        `${new URL(resource.url).pathname}: ${resource.encodedDataLength} bytes`,
    )
    .join("\n")

  const aboveFoldImageUrls = new Set(
    await page.evaluate(() =>
      [...document.images]
        .filter((image) => {
          const bounds = image.getBoundingClientRect()

          return bounds.bottom > 0 && bounds.top < window.innerHeight
        })
        .map(
          (image) => new URL(image.currentSrc || image.src, location.href).href,
        ),
    ),
  )

  const largestAboveFoldImageBytes = Math.max(
    0,
    ...[...resources.values()]
      .filter(
        (resource) =>
          resource.type === "Image" && aboveFoldImageUrls.has(resource.url),
      )
      .map((resource) => resource.encodedDataLength),
  )

  expect(
    sameOriginJavaScriptBytes,
    `JavaScript transferido: ${sameOriginJavaScriptBytes} bytes\n${sameOriginJavaScriptReport}`,
  ).toBeLessThanOrEqual(performanceBudgets.sameOriginJavaScriptBytes)
  expect(
    largestAboveFoldImageBytes,
    `Maior imagem acima da dobra: ${largestAboveFoldImageBytes} bytes`,
  ).toBeLessThanOrEqual(performanceBudgets.aboveFoldImageBytes)
})
