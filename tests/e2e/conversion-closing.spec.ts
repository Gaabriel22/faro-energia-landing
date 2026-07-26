import { expect, test } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("opens FAQ answers with native browser behavior", async ({ page }) => {
  const question = page.getByText("Posso instalar em um imóvel alugado?", {
    exact: true,
  })

  await question.click()

  await expect(
    page.getByText(
      /desde que haja autorização do proprietário e viabilidade técnica/,
    ),
  ).toBeVisible()
})

test("keeps the fixed mobile CTA from covering the footer", async ({
  page,
  isMobile,
}) => {
  const mobileCta = page.getByTestId("mobile-cta")

  if (!isMobile) {
    await expect(mobileCta).toBeHidden()
    return
  }

  await expect(mobileCta).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  const footer = page.getByRole("contentinfo")
  const footerBox = await footer.boundingBox()
  const ctaBox = await mobileCta.boundingBox()

  expect(footerBox).not.toBeNull()
  expect(ctaBox).not.toBeNull()
  expect(footerBox!.y + footerBox!.height).toBeLessThanOrEqual(ctaBox!.y + 1)
})
