import { expect, test } from "./fixtures"

test("uses CSS for the signature motion and interaction feedback", async ({
  page,
}) => {
  await page.goto("/")

  const rayAnimation = await page
    .locator(".motion-hero-ray")
    .evaluate((element) => getComputedStyle(element).animationName)
  const projectTransition = await page
    .locator(".motion-project-image")
    .first()
    .evaluate((element) => getComputedStyle(element).transitionProperty)

  expect(rayAnimation).toContain("faro-ray-reveal")
  expect(projectTransition).toContain("transform")
})

test.describe("reduced motion", () => {
  test("removes non-essential movement without hiding functionality", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto("/")

    const motion = await page
      .locator(".motion-hero-ray")
      .evaluate((element) => {
        const style = getComputedStyle(element)

        return {
          animationDuration: Number.parseFloat(style.animationDuration),
          animationDelay: Number.parseFloat(style.animationDelay),
          scrollBehavior: getComputedStyle(document.documentElement)
            .scrollBehavior,
        }
      })

    expect(motion.animationDuration).toBeLessThanOrEqual(0.00001)
    expect(motion.animationDelay).toBe(0)
    expect(motion.scrollBehavior).toBe("auto")

    const primaryCta = page
      .locator("#inicio")
      .getByRole("link", { name: "Simular minha economia" })
    await primaryCta.hover()
    await expect(primaryCta).toHaveCSS("transform", "none")

    await page
      .getByText("Posso instalar em um imóvel alugado?", { exact: true })
      .click()
    await expect(
      page.getByText(/desde que haja autorização do proprietário/),
    ).toBeVisible()
  })
})
