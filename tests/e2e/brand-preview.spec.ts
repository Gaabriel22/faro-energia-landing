import { expect, test } from "./fixtures"

test("captures the current brand foundation", async ({
  page,
  isMobile,
}, testInfo) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Seu telhado pode pagar parte da operação.",
    }),
  ).toBeVisible()

  for (const image of await page.locator("#projetos img").all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((element: HTMLImageElement) => element.decode())
  }

  await page.locator("#projetos").screenshot({
    path: `artifacts/visual/projects-${testInfo.project.name}.png`,
    animations: "disabled",
    style:
      'body > header, a[href="#conteudo"] { visibility: hidden !important; }',
  })
  const testimonialsSection = page.locator("section").filter({
    has: page.getByRole("heading", {
      level: 2,
      name: "Clareza antes, durante e depois.",
    }),
  })
  await testimonialsSection.screenshot({
    path: `artifacts/visual/testimonials-${testInfo.project.name}.png`,
    animations: "disabled",
    style:
      'body > header, a[href="#conteudo"] { visibility: hidden !important; }',
  })
  await page.locator("#duvidas").screenshot({
    path: `artifacts/visual/faq-${testInfo.project.name}.png`,
    animations: "disabled",
    style:
      'body > header, a[href="#conteudo"], [data-testid="mobile-cta"] { visibility: hidden !important; }',
  })
  await page.getByRole("contentinfo").screenshot({
    path: `artifacts/visual/footer-${testInfo.project.name}.png`,
    animations: "disabled",
    style:
      'body > header, a[href="#conteudo"], [data-testid="mobile-cta"] { visibility: hidden !important; }',
  })
  await page.evaluate(() => window.scrollTo(0, 0))

  await page.screenshot({
    path: `artifacts/visual/brand-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
  })

  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click()
    await page.screenshot({
      path: "artifacts/visual/mobile-navigation-open.png",
      animations: "disabled",
    })
  }
})
