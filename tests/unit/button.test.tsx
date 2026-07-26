import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("exposes its action through an accessible name", () => {
    render(<Button>Solicitar orçamento</Button>)

    expect(
      screen.getByRole("button", { name: "Solicitar orçamento" }),
    ).toBeEnabled()
  })
})
