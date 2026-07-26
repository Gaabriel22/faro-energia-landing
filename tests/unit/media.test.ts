import { statSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"

import { faroMedia, type FaroImage } from "@/content/media"

const images: FaroImage[] = [
  faroMedia.hero,
  ...Object.values(faroMedia.projects),
]

function publicFile(path: string) {
  return resolve(process.cwd(), "public", path.replace(/^\//, ""))
}

describe("responsive image assets", () => {
  it("declares meaningful alt text and ascending responsive variants", () => {
    for (const image of images) {
      expect(image.alt.length).toBeGreaterThan(20)
      expect(image.variants.map(({ width }) => width)).toEqual([640, 960, 1440])
    }
  })

  it("ships every AVIF and WebP derivative inside the public directory", () => {
    for (const image of images) {
      for (const variant of image.variants) {
        expect(statSync(publicFile(variant.avif)).size).toBeGreaterThan(0)
        expect(statSync(publicFile(variant.webp)).size).toBeGreaterThan(0)
      }
    }
  })

  it("keeps mobile variants inside the above-the-fold image budget", () => {
    const mobile = faroMedia.hero.variants[0]

    expect(statSync(publicFile(mobile.avif)).size).toBeLessThanOrEqual(
      180 * 1024,
    )
    expect(statSync(publicFile(mobile.webp)).size).toBeLessThanOrEqual(
      180 * 1024,
    )
  })

  it("keeps every generated derivative below 350 KB", () => {
    for (const image of images) {
      for (const variant of image.variants) {
        expect(statSync(publicFile(variant.avif)).size).toBeLessThan(350 * 1024)
        expect(statSync(publicFile(variant.webp)).size).toBeLessThan(350 * 1024)
      }
    }
  })
})
