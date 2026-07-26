import AxeBuilder from "@axe-core/playwright"

import { expect, test } from "./fixtures"

test("has no detectable accessibility violations", async ({ page }) => {
  await page.goto("/")

  const { violations } = await new AxeBuilder({ page }).analyze()
  const report = violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map((node) => node.html),
  }))

  expect(report, JSON.stringify(report, null, 2)).toEqual([])
})
