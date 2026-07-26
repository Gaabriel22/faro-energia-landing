import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { LeadForm } from "@/features/lead-form/lead-form"
import type { LeadFormState } from "@/features/lead-form/state"

const successState: LeadFormState = {
  status: "success",
  message:
    "Solicitação simulada com sucesso. Nenhum dado foi armazenado ou enviado.",
  fieldErrors: {},
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Seu nome/), "Ana Souza")
  await user.type(screen.getByLabelText(/Empresa/), "Padaria Horizonte")
  await user.type(
    screen.getByLabelText(/E-mail profissional/),
    "ana@horizonte.com.br",
  )
  await user.type(screen.getByLabelText(/Telefone/), "(11) 99999-9999")
  await user.click(screen.getByText("Selecione uma faixa"))
  await user.click(
    screen.getByRole("radio", { name: "De R$ 3.000 a R$ 9.999" }),
  )
}

describe("LeadForm", () => {
  it("provides persistent labels, required state and useful autocomplete", () => {
    const action = vi.fn(async () => successState)
    const { container } = render(<LeadForm action={action} />)

    expect(screen.getByLabelText(/Seu nome/)).toHaveAttribute(
      "autocomplete",
      "name",
    )
    expect(screen.getByLabelText(/Empresa/)).toHaveAttribute(
      "autocomplete",
      "organization",
    )
    expect(screen.getByLabelText(/E-mail profissional/)).toHaveAttribute(
      "autocomplete",
      "email",
    )
    expect(screen.getByLabelText(/Telefone/)).toHaveAttribute(
      "autocomplete",
      "tel",
    )
    expect(screen.getByLabelText(/Telefone/)).not.toBeRequired()
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeRequired()
    }

    const honeypot = container.querySelector<HTMLInputElement>("[name=website]")
    expect(honeypot).toHaveAttribute("autocomplete", "off")
    expect(honeypot).toHaveAttribute("tabindex", "-1")
  })

  it("validates on the client, preserves input and focuses the first error", async () => {
    const user = userEvent.setup()
    const action = vi.fn(async () => successState)
    render(<LeadForm action={action} />)

    const name = screen.getByLabelText(/Seu nome/)
    await user.type(name, "A")
    await user.click(
      screen.getByRole("button", { name: "Solicitar avaliação técnica" }),
    )

    expect(action).not.toHaveBeenCalled()
    expect(name).toHaveValue("A")
    expect(
      await screen.findByText("Informe seu nome com pelo menos 2 caracteres."),
    ).toBeVisible()
    expect(name).toHaveFocus()
    expect(name).toHaveAttribute("aria-invalid", "true")
    expect(name).toHaveAttribute("aria-describedby", "name-error")
    expect(
      screen.getByText("Revise os campos indicados antes de continuar."),
    ).toBeVisible()
  })

  it("blocks duplicate submission while pending and announces success", async () => {
    const user = userEvent.setup()
    let resolveAction: ((state: LeadFormState) => void) | undefined
    const action = vi.fn(
      () =>
        new Promise<LeadFormState>((resolve) => {
          resolveAction = resolve
        }),
    )
    render(<LeadForm action={action} />)

    await fillValidForm(user)
    await user.click(
      screen.getByRole("button", { name: "Solicitar avaliação técnica" }),
    )

    const pendingButton = await screen.findByRole("button", {
      name: "Enviando solicitação…",
    })
    expect(pendingButton).toBeDisabled()
    expect(pendingButton).toHaveAttribute("aria-disabled", "true")
    expect(action).toHaveBeenCalledTimes(1)

    await act(async () => {
      resolveAction?.(successState)
    })

    expect(await screen.findByRole("status")).toHaveTextContent(
      successState.message,
    )
    expect(
      screen.getByRole("button", { name: "Solicitar avaliação técnica" }),
    ).toBeEnabled()
  })
})
