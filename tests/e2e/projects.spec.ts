import { expect, test } from "./fixtures"

test("loads responsive project photography on demand", async ({ page }) => {
  await page.goto("/")

  const section = page.locator("#projetos")
  const images = section.getByRole("img")

  await expect(images).toHaveCount(3)

  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "lazy")
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((element: HTMLImageElement) => element.decode())
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0)
  }
})
