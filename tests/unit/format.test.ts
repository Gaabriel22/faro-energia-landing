import { describe, expect, it } from "vitest"

import { formatCurrency } from "@/lib/format"

describe("formatCurrency", () => {
  it("formats whole Brazilian real values without cents", () => {
    expect(formatCurrency(4820)).toMatch(/^R\$\s4\.820$/)
  })
})
