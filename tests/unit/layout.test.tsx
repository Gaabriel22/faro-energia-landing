import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionIntro } from "@/components/layout/section-intro"

describe("layout primitives", () => {
  it("preserves semantic section structure and heading hierarchy", () => {
    render(
      <Section aria-label="Benefícios">
        <Container>
          <SectionIntro
            eyebrow="Economia"
            title="Energia que trabalha para o negócio"
          />
        </Container>
      </Section>,
    )

    expect(screen.getByRole("region", { name: "Benefícios" })).toHaveAttribute(
      "data-tone",
      "canvas",
    )
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Energia que trabalha para o negócio",
      }),
    ).toBeVisible()
  })
})
