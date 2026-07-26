import { expect, test } from "./fixtures"

test("renders semantic content without horizontal overflow", async ({
  page,
}) => {
  await page.goto("/")

  const main = page.getByRole("main")

  await expect(main).toBeVisible()
  await expect(main).not.toHaveText("")

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )

  expect(hasHorizontalOverflow).toBe(false)
})

test("keeps both hero actions inside a 425px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 425, height: 830 })
  await page.goto("/")

  const hero = page.locator("#inicio")
  const primaryAction = hero.getByRole("link", {
    name: "Simular minha economia",
  })
  const secondaryAction = hero.getByRole("link", {
    name: "Conhecer o processo",
  })

  await expect(primaryAction).toBeInViewport()
  await expect(secondaryAction).toBeInViewport()

  const [primaryBox, secondaryBox] = await Promise.all([
    primaryAction.boundingBox(),
    secondaryAction.boundingBox(),
  ])

  expect(primaryBox).not.toBeNull()
  expect(secondaryBox).not.toBeNull()
  expect(secondaryBox!.x + secondaryBox!.width).toBeLessThanOrEqual(425)
  expect(secondaryBox!.y).toBeGreaterThanOrEqual(
    primaryBox!.y + primaryBox!.height,
  )
})
