import { expect, test } from "./fixtures"

test("keeps essential content available without JavaScript", async ({
  page,
}) => {
  await page.goto("/")

  const main = page.getByRole("main")

  await expect(main).toBeVisible()
  await expect(main).not.toHaveText("")
})
