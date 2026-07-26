import { afterEach, describe, expect, it, vi } from "vitest"

import { submitLead } from "@/features/lead-form/actions"
import { initialLeadFormState } from "@/features/lead-form/state"

function createValidFormData() {
  const formData = new FormData()

  formData.set("name", "Marina Alves")
  formData.set("email", "marina@example.com")
  formData.set("phone", "(11) 98765-4321")
  formData.set("company", "Clínica Vereda")
  formData.set("monthlyBillRange", "3000-9999")
  formData.set("website", "")

  return formData
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("submitLead", () => {
  it("returns demonstrative success without transmitting or logging PII", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch")
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined)

    const result = await submitLead(initialLeadFormState, createValidFormData())

    expect(result).toEqual({
      status: "success",
      message:
        "Solicitação simulada com sucesso. Nenhum dado foi armazenado ou enviado.",
      fieldErrors: {},
    })
    expect(JSON.stringify(result)).not.toContain("marina@example.com")
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(logSpy).not.toHaveBeenCalled()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it("revalidates visible fields and returns only correction messages", async () => {
    const formData = createValidFormData()
    formData.set("email", "invalid")
    formData.set("company", "A")

    const result = await submitLead(initialLeadFormState, formData)

    expect(result.status).toBe("error")
    expect(result.fieldErrors.email).toContain("Informe um e-mail válido.")
    expect(result.fieldErrors.company).toContain(
      "Informe a empresa com pelo menos 2 caracteres.",
    )
    expect(JSON.stringify(result)).not.toContain("invalid")
  })

  it("uses the same generic rejection for bots and unexpected entries", async () => {
    const botData = createValidFormData()
    botData.set("website", "https://spam.test")

    const unexpectedData = createValidFormData()
    unexpectedData.set("role", "admin")

    const botResult = await submitLead(initialLeadFormState, botData)
    const unexpectedResult = await submitLead(
      initialLeadFormState,
      unexpectedData,
    )

    expect(botResult).toEqual(unexpectedResult)
    expect(botResult).toEqual({
      status: "error",
      message:
        "Não foi possível enviar agora. Revise os campos e tente novamente.",
      fieldErrors: {},
    })
    expect(JSON.stringify(botResult)).not.toMatch(/website|honeypot|spam/i)
  })

  it("rejects duplicate expected fields without exposing the rule", async () => {
    const formData = createValidFormData()
    formData.append("email", "second@example.com")

    const result = await submitLead(initialLeadFormState, formData)

    expect(result.status).toBe("error")
    expect(result.fieldErrors).toEqual({})
    expect(JSON.stringify(result)).not.toContain("second@example.com")
  })
})
