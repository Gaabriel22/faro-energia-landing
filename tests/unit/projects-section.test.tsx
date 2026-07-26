import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProjectsSection } from "@/components/sections/projects-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

describe("projects and testimonials", () => {
  it("renders each project with responsive media and technical results", () => {
    render(<ProjectsSection />)

    expect(screen.getAllByRole("article")).toHaveLength(3)
    expect(screen.getAllByRole("img")).toHaveLength(3)
    expect(
      screen.getByRole("heading", { level: 3, name: "Padaria Aurora" }),
    ).toBeVisible()
    expect(screen.getByText("R$ 4.820")).toBeVisible()
  })

  it("keeps both customer accounts visible without a carousel", () => {
    render(<TestimonialsSection />)

    expect(screen.getAllByRole("blockquote")).toHaveLength(2)
    expect(screen.getByText("Marina Alves")).toBeVisible()
    expect(screen.getByText("Renato Silva")).toBeVisible()
  })
})
