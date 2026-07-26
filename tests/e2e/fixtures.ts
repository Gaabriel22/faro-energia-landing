import { expect, test as base } from "@playwright/test"

type ConsoleGateFixtures = {
  consoleGate: void
}

export const test = base.extend<ConsoleGateFixtures>({
  consoleGate: [
    async ({ page }, use) => {
      const errors: string[] = []

      page.on("console", (message) => {
        if (message.type() === "error") {
          errors.push(`console.error: ${message.text()}`)
        }
      })

      page.on("pageerror", (error) => {
        errors.push(`pageerror: ${error.message}`)
      })

      await use()

      expect(
        errors,
        `A página emitiu erros inesperados:\n${errors.join("\n")}`,
      ).toEqual([])
    },
    { auto: true },
  ],
})

export { expect }
