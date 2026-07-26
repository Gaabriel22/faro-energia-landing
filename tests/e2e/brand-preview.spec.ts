import { expect, test } from "./fixtures"

test("captures the current brand foundation", async ({ page }, testInfo) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Seu telhado pode pagar parte da operação.",
    }),
  ).toBeVisible()

  await page.screenshot({
    path: `artifacts/visual/brand-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
  })
})
