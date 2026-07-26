export const SAVINGS_RATE = 0.8
export const MINIMUM_MONTHLY_BILL = 300
export const MAXIMUM_MONTHLY_BILL = 100_000

export type SavingsEstimate = {
  monthlyBill: number
  monthlySavings: number
  annualSavings: number
  savingsRate: number
}

export function calculateSavings(monthlyBill: number): SavingsEstimate {
  if (
    !Number.isFinite(monthlyBill) ||
    monthlyBill < MINIMUM_MONTHLY_BILL ||
    monthlyBill > MAXIMUM_MONTHLY_BILL
  ) {
    throw new RangeError(
      `Monthly bill must be between ${MINIMUM_MONTHLY_BILL} and ${MAXIMUM_MONTHLY_BILL}.`,
    )
  }

  return {
    monthlyBill,
    monthlySavings: Math.round(monthlyBill * SAVINGS_RATE),
    annualSavings: Math.round(monthlyBill * SAVINGS_RATE * 12),
    savingsRate: SAVINGS_RATE,
  }
}

export function parseBrazilianCurrency(value: string): number | null {
  const normalized = value
    .trim()
    .replace(/^R\$\s?/i, "")
    .replace(/\s/g, "")

  const isBrazilianCurrency = /^(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d{1,2})?$/.test(
    normalized,
  )

  if (!isBrazilianCurrency) {
    return null
  }

  const parsed = Number(normalized.replace(/\./g, "").replace(",", "."))

  return Number.isFinite(parsed) ? parsed : null
}
