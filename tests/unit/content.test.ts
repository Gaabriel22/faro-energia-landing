import { describe, expect, it } from "vitest"

import { faroBrand, faroLandingContent } from "@/content"

describe("Faro content", () => {
  it("keeps primary conversion actions consistent", () => {
    expect(faroLandingContent.hero.primaryCta).toEqual(faroBrand.primaryCta)
    expect(faroLandingContent.finalCta.action).toEqual(faroBrand.primaryCta)
  })

  it("keeps project savings aligned with the 80% estimator premise", () => {
    for (const project of faroLandingContent.projects.items) {
      expect(project.estimatedMonthlySavings).toBe(
        Math.round(project.previousMonthlyBill * 0.8),
      )
    }
  })

  it("uses unique ids in every repeated content group", () => {
    const ids = [
      ...faroLandingContent.benefits.map(({ id }) => id),
      ...faroLandingContent.process.steps.map(({ id }) => id),
      ...faroLandingContent.projects.items.map(({ id }) => id),
      ...faroLandingContent.testimonials.map(({ id }) => id),
      ...faroLandingContent.guarantees.items.map(({ id }) => id),
      ...faroLandingContent.faq.items.map(({ id }) => id),
    ]

    expect(new Set(ids).size).toBe(ids.length)
  })
})
