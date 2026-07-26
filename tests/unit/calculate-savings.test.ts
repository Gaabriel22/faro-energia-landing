import { describe, expect, it } from "vitest"

import {
  calculateSavings,
  MAXIMUM_MONTHLY_BILL,
  MINIMUM_MONTHLY_BILL,
  parseBrazilianCurrency,
  SAVINGS_RATE,
} from "@/features/savings-estimator/calculate-savings"

describe("calculateSavings", () => {
  it("calculates the documented 80% monthly and annual estimate", () => {
    expect(calculateSavings(1_000)).toEqual({
      monthlyBill: 1_000,
      monthlySavings: 800,
      annualSavings: 9_600,
      savingsRate: SAVINGS_RATE,
    })
  })

  it("accepts both inclusive bill limits", () => {
    expect(calculateSavings(MINIMUM_MONTHLY_BILL).monthlySavings).toBe(240)
    expect(calculateSavings(MAXIMUM_MONTHLY_BILL).annualSavings).toBe(960_000)
  })

  it("rounds monthly and annual estimates to the nearest real", () => {
    expect(calculateSavings(300.49)).toMatchObject({
      monthlySavings: 240,
      annualSavings: 2_885,
    })
  })

  it.each([299.99, 100_000.01, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects an invalid monthly bill: %s",
    (monthlyBill) => {
      expect(() => calculateSavings(monthlyBill)).toThrow(RangeError)
    },
  )
})

describe("parseBrazilianCurrency", () => {
  it.each([
    ["1000", 1_000],
    ["1.000", 1_000],
    ["R$ 1.000,50", 1_000.5],
    ["100000", 100_000],
  ])("parses %s as %d", (input, expected) => {
    expect(parseBrazilianCurrency(input)).toBe(expected)
  })

  it.each(["", "mil", "1,2,3", "10.00", "R$"])(
    "rejects malformed input: %s",
    (input) => {
      expect(parseBrazilianCurrency(input)).toBeNull()
    },
  )
})
