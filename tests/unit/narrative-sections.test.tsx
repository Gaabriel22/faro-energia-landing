import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { GuaranteesSection } from "@/components/sections/guarantees-section"
import { ProblemBenefitsSection } from "@/components/sections/problem-benefits-section"
import { ProcessSection } from "@/components/sections/process-section"
import { TrustBand } from "@/components/sections/trust-band"

describe("conversion narrative sections", () => {
  it("renders trust metrics as a labelled description list", () => {
    render(<TrustBand />)

    const band = screen.getByRole("complementary", {
      name: "Engenharia que já trabalha para negócios da região",
    })

    expect(within(band).getAllByRole("term")).toHaveLength(3)
    expect(within(band).getAllByRole("definition")).toHaveLength(3)
  })

  it("presents benefits with a single section heading", () => {
    render(<ProblemBenefitsSection />)

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A conta sobe. Seu planejamento não precisa subir junto.",
      }),
    ).toBeVisible()
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3)
  })

  it("keeps the four process steps and guarantees in semantic lists", () => {
    const { rerender } = render(<ProcessSection />)

    expect(screen.getByRole("list")).toBeVisible()
    expect(screen.getAllByRole("listitem")).toHaveLength(4)

    rerender(<GuaranteesSection />)

    expect(screen.getByRole("list")).toBeVisible()
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
  })
})
