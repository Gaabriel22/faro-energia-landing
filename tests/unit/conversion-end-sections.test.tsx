import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SiteFooter } from "@/components/layout/site-footer"
import { MobileCta } from "@/components/navigation/mobile-cta"
import { FaqSection } from "@/components/sections/faq-section"
import { FinalCtaSection } from "@/components/sections/final-cta-section"

describe("conversion closing sections", () => {
  it("renders the complete FAQ with a useful answer open by default", () => {
    render(<FaqSection />)

    const faq = screen.getByRole("region", {
      name: "O que todo negócio deveria perguntar.",
    })
    const questions = within(faq).getAllByRole("heading", { level: 3 })

    expect(questions).toHaveLength(6)
    expect(questions[0].closest("details")).toHaveAttribute("open")
    expect(
      within(faq).getByText(/Pode chegar, mas varia com consumo/),
    ).toBeVisible()
  })

  it("keeps the final call to action consistent with the conversion path", () => {
    render(<FinalCtaSection />)

    expect(
      screen.getByRole("link", { name: "Simular minha economia" }),
    ).toHaveAttribute("href", "#simulador")
    expect(
      screen.getByText("Diagnóstico sem custo e sem compromisso"),
    ).toBeVisible()
  })

  it("provides contact information and a labelled footer navigation", () => {
    render(<SiteFooter />)

    expect(
      screen.getByRole("link", { name: "ola@faroenergia.com.br" }),
    ).toHaveAttribute("href", "mailto:ola@faroenergia.com.br")
    expect(
      screen.getByRole("navigation", { name: "Explore a Faro" }),
    ).toBeVisible()
    expect(screen.getByText("São Paulo e interior")).toBeVisible()
  })

  it("offers a dedicated mobile conversion shortcut", () => {
    render(<MobileCta />)

    const shortcut = screen.getByRole("complementary", {
      name: "Atalho para simulação",
    })

    expect(
      within(shortcut).getByRole("link", {
        name: "Simular minha economia",
      }),
    ).toHaveAttribute("href", "#simulador")
  })
})
