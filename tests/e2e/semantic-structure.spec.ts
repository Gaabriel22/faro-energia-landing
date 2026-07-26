import { expect, test } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("keeps a coherent heading outline and distinguishable landmarks", async ({
  page,
  isMobile,
}) => {
  const headingLevels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.slice(1))),
    )

  expect(headingLevels.filter((level) => level === 1)).toHaveLength(1)
  expect(headingLevels[0]).toBe(1)

  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(
      headingLevels[index],
      `Heading ${index + 1} skips from h${headingLevels[index - 1]} to h${headingLevels[index]}`,
    ).toBeLessThanOrEqual(headingLevels[index - 1] + 1)
  }

  await expect(page.getByRole("banner")).toHaveCount(1)
  await expect(page.getByRole("main")).toHaveCount(1)
  await expect(page.getByRole("contentinfo")).toHaveCount(1)
  await expect(
    page.getByRole("complementary", {
      name: "Engenharia que já trabalha para negócios da região",
    }),
  ).toHaveCount(1)
  await expect(
    page.getByRole("complementary", {
      name: "Atalho para simulação",
      includeHidden: true,
    }),
  ).toHaveCount(1)

  const navigationName = isMobile ? "Navegação móvel" : "Navegação principal"

  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click()
  }

  await expect(
    page.getByRole("navigation", { name: navigationName }),
  ).toBeVisible()
  await expect(
    page.getByRole("navigation", { name: "Explore a Faro" }),
  ).toHaveCount(1)
})

test("resolves every internal fragment to an existing target", async ({
  page,
}) => {
  const missingFragments = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      [
        ...new Set(
          links
            .map((link) => link.getAttribute("href")?.slice(1))
            .filter((fragment): fragment is string => Boolean(fragment)),
        ),
      ]
        .filter((fragment) => document.getElementById(fragment) === null)
        .sort(),
    )

  expect(missingFragments).toEqual([])
})

test("preserves DOM focus order without positive tabindex values", async ({
  page,
  isMobile,
}) => {
  await expect(
    page.locator('[tabindex]:not([tabindex="0"], [tabindex="-1"])'),
  ).toHaveCount(0)

  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused()

  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("link", { name: "Faro Energia — início" }),
  ).toBeFocused()

  await page.keyboard.press("Tab")

  if (isMobile) {
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused()
  } else {
    await expect(
      page
        .getByRole("navigation", { name: "Navegação principal" })
        .getByRole("link", { name: "Benefícios" }),
    ).toBeFocused()
  }
})
