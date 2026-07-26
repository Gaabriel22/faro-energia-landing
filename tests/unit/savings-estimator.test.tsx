import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { SavingsEstimator } from "@/features/savings-estimator/savings-estimator"

const disclaimer =
  "Estimativa ilustrativa baseada em redução de 80%. O resultado não tem valor contratual."

describe("SavingsEstimator", () => {
  it("renders an initial estimate with its premise and contextual CTA", () => {
    render(<SavingsEstimator disclaimer={disclaimer} />)

    const result = screen.getByRole("status", {
      name: "Resultado da estimativa",
    })

    expect(within(result).getByText(/^R\$\s*2\.000$/)).toBeVisible()
    expect(within(result).getByText(/^R\$\s*24\.000$/)).toBeVisible()
    expect(screen.getByText(disclaimer)).toBeVisible()
    expect(
      screen.getByRole("link", { name: "Solicitar avaliação técnica" }),
    ).toHaveAttribute("href", "#orcamento")
  })

  it("calculates a valid Brazilian real input", async () => {
    const user = userEvent.setup()
    render(<SavingsEstimator disclaimer={disclaimer} />)

    const input = screen.getByRole("textbox", {
      name: "Qual é a média mensal da sua conta?",
    })

    await user.clear(input)
    await user.type(input, "1.000")
    await user.click(screen.getByRole("button", { name: "Calcular economia" }))

    const result = screen.getByRole("status", {
      name: "Resultado da estimativa",
    })

    expect(within(result).getByText(/^R\$\s*800$/)).toBeVisible()
    expect(within(result).getByText(/^R\$\s*9\.600$/)).toBeVisible()
    expect(input).toHaveAttribute("aria-invalid", "false")
  })

  it("preserves an invalid value and associates a useful error", async () => {
    const user = userEvent.setup()
    render(<SavingsEstimator disclaimer={disclaimer} />)

    const input = screen.getByRole("textbox", {
      name: "Qual é a média mensal da sua conta?",
    })

    await user.clear(input)
    await user.type(input, "250")
    await user.click(screen.getByRole("button", { name: "Calcular economia" }))

    expect(input).toHaveValue("250")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAttribute(
      "aria-describedby",
      "monthly-bill-hint monthly-bill-error",
    )
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe uma conta mensal a partir de R$ 300.",
    )
  })
})
