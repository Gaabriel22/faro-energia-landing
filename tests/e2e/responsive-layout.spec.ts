import type { Page } from "@playwright/test"

import { expect, test } from "./fixtures"

const viewportMatrix = [
  { name: "minimum width", width: 320, height: 800 },
  { name: "compact mobile", width: 375, height: 667 },
  { name: "reported regression", width: 425, height: 830 },
  { name: "mobile landscape", width: 844, height: 390 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "tablet landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide desktop", width: 2560, height: 1440 },
] as const

type LayoutOffender = {
  selector: string
  text: string
  left: number
  right: number
}

async function getHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const root = document.documentElement

    return {
      clientWidth: root.clientWidth,
      scrollWidth: root.scrollWidth,
    }
  })
}

async function getClippedContent(page: Page) {
  return page.evaluate<LayoutOffender[]>(() => {
    const viewportWidth = document.documentElement.clientWidth
    const candidates = document.querySelectorAll<HTMLElement>(
      "a, button, input:not([type='hidden']), summary, h1, h2, h3, p, dt, dd",
    )

    return Array.from(candidates).flatMap((element) => {
      const styles = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      const isRendered =
        styles.display !== "none" &&
        styles.visibility !== "hidden" &&
        Number(styles.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0

      if (
        !isRendered ||
        element.closest("[aria-hidden='true']") ||
        element.closest(".sr-only")
      ) {
        return []
      }

      const tolerance = 1
      if (rect.left >= -tolerance && rect.right <= viewportWidth + tolerance) {
        return []
      }

      return [
        {
          selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}`,
          text: (element.textContent ?? "").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        },
      ]
    })
  })
}

test.describe("responsive layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
  })

  for (const viewport of viewportMatrix) {
    test(`${viewport.name}: ${viewport.width}x${viewport.height} has no horizontal clipping`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport)
      await page.goto("/")
      await page.getByRole("contentinfo").scrollIntoViewIfNeeded()

      const overflow = await getHorizontalOverflow(page)
      expect(
        overflow.scrollWidth,
        `Document width at ${viewport.width}x${viewport.height}`,
      ).toBeLessThanOrEqual(overflow.clientWidth)

      expect(
        await getClippedContent(page),
        `Visible content clipped at ${viewport.width}x${viewport.height}`,
      ).toEqual([])
    })
  }

  test("conversion controls retain adequate touch targets on narrow screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto("/")

    const controls = [
      page.getByRole("button", { name: "Menu" }),
      page.getByRole("link", { name: /Simular minha economia/ }).first(),
      page.getByRole("link", { name: /Conhecer o processo/ }),
      page.getByLabel("Qual é a média mensal da sua conta?"),
      page.getByRole("button", { name: "Calcular economia" }),
      page.locator("#monthlyBillRange"),
      page.getByRole("button", { name: "Solicitar avaliação técnica" }),
    ]

    for (const control of controls) {
      await control.scrollIntoViewIfNeeded()
      const box = await control.boundingBox()

      expect(box, "Expected conversion control to be visible").not.toBeNull()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }
  })

  test("mobile navigation remains usable in a short landscape viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 844, height: 390 })
    await page.goto("/")
    await page.getByRole("button", { name: "Menu" }).click()

    const menu = page.locator("#mobile-navigation")
    const menuBox = await menu.boundingBox()

    expect(menuBox).not.toBeNull()
    expect(menuBox!.y + menuBox!.height).toBeLessThanOrEqual(390)
    await expect(menu.getByRole("link", { name: /Simular/ })).toBeVisible()
    await expect(page.getByTestId("mobile-cta")).toBeHidden()
  })

  test("the fixed mobile CTA does not cover the end of the footer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto("/")
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const ctaBox = await page.getByTestId("mobile-cta").boundingBox()
    const lastFooterLineBox = await page
      .getByRole("contentinfo")
      .locator("p")
      .last()
      .boundingBox()

    expect(ctaBox).not.toBeNull()
    expect(lastFooterLineBox).not.toBeNull()
    expect(
      lastFooterLineBox!.y + lastFooterLineBox!.height,
    ).toBeLessThanOrEqual(ctaBox!.y)
  })

  test("the initial render stays within the good CLS threshold", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const observedWindow = window as Window & { __faroCls?: number }
      observedWindow.__faroCls = 0

      new PerformanceObserver((entries) => {
        for (const entry of entries.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean
            value: number
          }

          if (!shift.hadRecentInput) {
            observedWindow.__faroCls! += shift.value
          }
        }
      }).observe({ type: "layout-shift", buffered: true })
    })

    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForTimeout(500)

    const cls = await page.evaluate(
      () => (window as Window & { __faroCls?: number }).__faroCls ?? 0,
    )
    expect(cls).toBeLessThanOrEqual(0.1)
  })

  test("content reflows at the 640 CSS-pixel equivalent of 200% zoom", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 640, height: 720 })
    await page.goto("/")
    await page.getByRole("contentinfo").scrollIntoViewIfNeeded()

    const overflow = await getHorizontalOverflow(page)
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
    expect(await getClippedContent(page)).toEqual([])
  })
})
