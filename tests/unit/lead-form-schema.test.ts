import { describe, expect, it } from "vitest"

import {
  leadFormSchema,
  MONTHLY_BILL_RANGES,
} from "@/features/lead-form/schema"

const validInput = {
  name: "  Marina Alves  ",
  email: "  MARINA@EXAMPLE.COM  ",
  phone: "(11) 98765-4321",
  company: "  Clínica Vereda  ",
  monthlyBillRange: "3000-9999",
  website: "",
}

describe("leadFormSchema", () => {
  it("normalizes every accepted text field at the shared boundary", () => {
    expect(leadFormSchema.parse(validInput)).toEqual({
      name: "Marina Alves",
      email: "marina@example.com",
      phone: "11987654321",
      company: "Clínica Vereda",
      monthlyBillRange: "3000-9999",
      website: "",
    })
  })

  it.each(MONTHLY_BILL_RANGES)(
    "accepts the documented monthly bill range: %s",
    (monthlyBillRange) => {
      expect(
        leadFormSchema.safeParse({ ...validInput, monthlyBillRange }).success,
      ).toBe(true)
    },
  )

  it("accepts an omitted or empty optional phone", () => {
    expect(
      leadFormSchema.parse({ ...validInput, phone: "" }).phone,
    ).toBeUndefined()

    expect(
      leadFormSchema.parse({
        name: validInput.name,
        email: validInput.email,
        company: validInput.company,
        monthlyBillRange: validInput.monthlyBillRange,
        website: validInput.website,
      }).phone,
    ).toBeUndefined()
  })

  it.each([
    ["name", "A"],
    ["name", "A".repeat(81)],
    ["email", "not-an-email"],
    ["email", `${"a".repeat(246)}@mail.com`],
    ["phone", "11 CALL FARO"],
    ["phone", "119999999"],
    ["company", "A"],
    ["company", "A".repeat(101)],
    ["monthlyBillRange", "100-299"],
  ])("rejects an invalid %s", (field, value) => {
    const result = leadFormSchema.safeParse({ ...validInput, [field]: value })

    expect(result.success).toBe(false)
  })

  it("rejects a filled honeypot and unknown keys", () => {
    expect(
      leadFormSchema.safeParse({ ...validInput, website: "https://bot.test" })
        .success,
    ).toBe(false)
    expect(
      leadFormSchema.safeParse({ ...validInput, admin: true }).success,
    ).toBe(false)
  })
})
