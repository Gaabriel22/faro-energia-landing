import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { BrandIcon } from "@/components/brand/brand-icon"
import { FaroLogo } from "@/components/brand/faro-logo"
import { SolarRay } from "@/components/brand/solar-ray"

describe("Faro brand assets", () => {
  it("exposes the logo name once to assistive technology", () => {
    render(<FaroLogo />)

    expect(screen.getByRole("img", { name: "Faro Energia" })).toBeVisible()
  })

  it("keeps decorative vectors out of the accessibility tree", () => {
    const { container } = render(
      <>
        <SolarRay />
        <BrandIcon name="roof" />
      </>,
    )

    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})
