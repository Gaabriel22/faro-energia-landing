import { mkdir } from "node:fs/promises"
import path from "node:path"
import type { Page } from "@playwright/test"

import { expect, test } from "./fixtures"

const outputDirectory = path.resolve("docs/visual-review")

async function preparePage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/", { waitUntil: "networkidle" })
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  })

  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.8, 400)

    for (let offset = 0; offset < document.body.scrollHeight; offset += step) {
      window.scrollTo(0, offset)
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      )
    }

    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true })
              image.addEventListener("error", () => resolve(), { once: true })
            }),
      ),
    )
    await document.fonts.ready
    window.scrollTo(0, 0)
  })
}

test("captures the landing page and its primary interactive states", async ({
  page,
  isMobile,
}) => {
  await mkdir(outputDirectory, { recursive: true })
  await preparePage(page)

  const device = isMobile ? "mobile" : "desktop"
  const screenshotOptions = {
    type: "jpeg" as const,
    quality: 86,
  }

  await page.screenshot({
    ...screenshotOptions,
    path: path.join(outputDirectory, `${device}-full.jpg`),
    fullPage: true,
  })

  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click()
    await expect(
      page.getByRole("navigation", { name: "Navegação móvel" }),
    ).toBeVisible()
    await page.screenshot({
      ...screenshotOptions,
      path: path.join(outputDirectory, "mobile-menu.jpg"),
    })
    await page.getByRole("button", { name: "Menu" }).click()
  }

  await page.addStyleTag({
    content:
      'body > header, a[href="#conteudo"], [data-testid="mobile-cta"]{display:none!important}',
  })

  const estimator = page.locator("#simulador")
  await estimator.scrollIntoViewIfNeeded()
  await page.getByLabel("Qual é a média mensal da sua conta?").fill("1.000")
  await page.getByRole("button", { name: "Calcular economia" }).click()
  await expect(
    page.getByRole("status", { name: "Resultado da estimativa" }),
  ).toContainText("R$ 800")
  await estimator.screenshot({
    ...screenshotOptions,
    path: path.join(outputDirectory, `${device}-estimator.jpg`),
  })

  const faq = page.locator("#duvidas")
  await faq.scrollIntoViewIfNeeded()
  const secondQuestion = faq.locator("details").nth(1)
  await secondQuestion.locator("summary").click()
  await expect(secondQuestion).toHaveAttribute("open", "")
  await faq.screenshot({
    ...screenshotOptions,
    path: path.join(outputDirectory, `${device}-faq.jpg`),
  })

  const leadSection = page.locator("#orcamento")
  await leadSection.scrollIntoViewIfNeeded()
  await page
    .getByRole("button", { name: "Solicitar avaliação técnica" })
    .click()
  await expect(leadSection.getByRole("alert")).toContainText(
    "Revise os campos indicados",
  )
  await leadSection.screenshot({
    ...screenshotOptions,
    path: path.join(outputDirectory, `${device}-form-validation.jpg`),
  })
})
