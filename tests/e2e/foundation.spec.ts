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
