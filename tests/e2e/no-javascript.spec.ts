import { expect, test } from "./fixtures"

test("keeps essential content available without JavaScript", async ({
  page,
}) => {
  await page.goto("/")

  const main = page.getByRole("main")

  await expect(main).toBeVisible()
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "A conta sobe. Seu planejamento não precisa subir junto.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Um processo claro, sem caixa-preta.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Equipamento protegido. Geração acompanhada.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Economia que aparece no caixa.",
    }),
  ).toBeVisible()
  await expect(page.getByText("Marina Alves")).toBeVisible()
})
