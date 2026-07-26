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
      name: "Descubra quanto da conta pode voltar para o negócio.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("textbox", {
      name: "Qual é a média mensal da sua conta?",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("status", { name: "Resultado da estimativa" }),
  ).toContainText("R$ 2.000")
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
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "O que todo negócio deveria perguntar.",
    }),
  ).toBeVisible()
  await expect(
    page.getByText(/Pode chegar, mas varia com consumo/),
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Veja se a energia solar fecha para o seu negócio.",
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "ola@faroenergia.com.br" }),
  ).toBeVisible()
})
