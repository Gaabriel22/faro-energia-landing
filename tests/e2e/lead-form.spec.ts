import { expect, test } from "./fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test("keeps the custom bill range menu aligned below its trigger", async ({
  page,
}) => {
  const form = page.locator("#orcamento")
  const trigger = form.locator("#monthlyBillRange")

  await trigger.click()

  const popup = form
    .getByRole("radio", { name: "De R$ 300 a R$ 999" })
    .locator("..")
    .locator("..")
  await expect(popup).toBeVisible()

  const triggerBox = await trigger.boundingBox()
  const popupBox = await popup.boundingBox()

  expect(triggerBox).not.toBeNull()
  expect(popupBox).not.toBeNull()
  expect(popupBox!.y).toBeGreaterThanOrEqual(
    triggerBox!.y + triggerBox!.height + 4,
  )
  await expect
    .poll(async () => {
      const currentTriggerBox = await trigger.boundingBox()
      const currentPopupBox = await popup.boundingBox()

      return Math.abs(currentPopupBox!.width - currentTriggerBox!.width)
    })
    .toBeLessThanOrEqual(1)
})

test("validates, preserves values and completes the demonstrative lead flow", async ({
  page,
}) => {
  const form = page.locator("#orcamento")
  const name = form.getByRole("textbox", { name: "Seu nome" })

  await name.fill("A")
  await form
    .getByRole("button", { name: "Solicitar avaliação técnica" })
    .click()

  await expect(name).toHaveValue("A")
  await expect(name).toBeFocused()
  await expect(name).toHaveAttribute("aria-invalid", "true")

  await name.fill("Ana Souza")
  await form.getByRole("textbox", { name: "Empresa" }).fill("Padaria Horizonte")
  await form
    .getByRole("textbox", { name: "E-mail profissional" })
    .fill("ana@horizonte.com.br")
  await form.locator("#monthlyBillRange").click()
  await page.getByText("De R$ 3.000 a R$ 9.999", { exact: true }).click()
  await form
    .getByRole("button", { name: "Solicitar avaliação técnica" })
    .click()

  await expect(form.getByRole("status")).toContainText(
    "Solicitação simulada com sucesso",
  )
})
