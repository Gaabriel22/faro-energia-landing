import { expect, test } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("connects the primary CTA to the estimator", async ({ page }) => {
  await page
    .locator("#inicio")
    .getByRole("link", { name: "Simular minha economia" })
    .click()

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Descubra quanto da conta pode voltar para o negócio.",
    }),
  ).toBeInViewport()
})

test("calculates the documented estimate and offers the next step", async ({
  page,
}) => {
  const estimator = page.locator("#simulador")
  const input = estimator.getByRole("textbox", {
    name: "Qual é a média mensal da sua conta?",
  })

  await input.fill("1.000")
  await input.press("Enter")

  const result = estimator.getByRole("status", {
    name: "Resultado da estimativa",
  })

  await expect(result).toContainText("R$ 800")
  await expect(result).toContainText("R$ 9.600")
  await expect(estimator.getByText("Base de cálculo: 80%")).toBeVisible()
  await expect(
    estimator.getByRole("link", { name: "Solicitar avaliação técnica" }),
  ).toHaveAttribute("href", "#orcamento")
})

test("preserves invalid input and explains how to correct it", async ({
  page,
}) => {
  const estimator = page.locator("#simulador")
  const input = estimator.getByRole("textbox", {
    name: "Qual é a média mensal da sua conta?",
  })

  await input.fill("200")
  await estimator.getByRole("button", { name: "Calcular economia" }).click()

  await expect(input).toHaveValue("200")
  await expect(input).toHaveAttribute("aria-invalid", "true")
  await expect(estimator.getByRole("alert")).toHaveText(
    "Informe uma conta mensal a partir de R$ 300.",
  )
})

test("uses a numeric projection without chart markup", async ({ page }) => {
  const estimator = page.locator("#simulador")

  await expect(estimator.locator("canvas")).toHaveCount(0)
  await expect(estimator.locator('[class*="recharts"]')).toHaveCount(0)
})
