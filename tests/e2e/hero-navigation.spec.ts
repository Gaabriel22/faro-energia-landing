import { expect, test } from "./fixtures"

test("presents the conversion promise and a stable hero image", async ({
  page,
  isMobile,
}) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Seu telhado pode pagar parte da operação.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Simular minha economia" }).first(),
  ).toHaveAttribute("href", "#simulador")
  await expect(
    page.getByRole("img", {
      name: "Empreendedora em uma padaria observa o telhado equipado com painéis solares.",
    }),
  ).toBeVisible()

  if (isMobile) {
    const trustNoteBottom = await page
      .getByTestId("hero-trust-note")
      .evaluate((element) => element.getBoundingClientRect().bottom)
    const viewportHeight = await page.evaluate(() => window.innerHeight)

    expect(trustNoteBottom).toBeLessThanOrEqual(viewportHeight)
  }
})

test("offers an accessible responsive navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("/")

  if (!isMobile) {
    await expect(
      page.getByRole("navigation", { name: "Navegação principal" }),
    ).toBeVisible()
    return
  }

  const trigger = page.getByRole("button", { name: "Menu" })

  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(
    page.getByRole("navigation", { name: "Navegação móvel" }),
  ).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await expect(trigger).toBeFocused()
})

test("moves keyboard users from the skip link to main content", async ({
  page,
}) => {
  await page.goto("/")
  await page.keyboard.press("Tab")

  const skipLink = page.getByRole("link", { name: "Pular para o conteúdo" })

  await expect(skipLink).toBeFocused()
  await skipLink.press("Enter")
  await expect(page.getByRole("main")).toBeFocused()
})

test("keeps anchored sections clear of the fixed header", async ({
  page,
  isMobile,
}) => {
  await page.goto("/")

  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click()
    await page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("link", { name: "Como funciona" })
      .click()
  } else {
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Como funciona" })
      .click()
  }

  const headerBottom = await page
    .getByRole("banner")
    .evaluate((element) => element.getBoundingClientRect().bottom)

  await expect
    .poll(() =>
      page
        .locator("#como-funciona")
        .evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeGreaterThanOrEqual(headerBottom)
  await expect
    .poll(() =>
      page
        .locator("#como-funciona")
        .evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeLessThan(headerBottom + 40)
})
