import { mkdir } from "node:fs/promises"
import { basename, resolve } from "node:path"
import process from "node:process"
import sharp from "sharp"

const DEFAULT_WIDTHS = [640, 960, 1440]
const OUTPUT_ROOT = resolve("public/images/generated")

function parseWidths(value) {
  if (!value) return DEFAULT_WIDTHS

  const widths = value
    .split(",")
    .map(Number)
    .filter((width) => Number.isInteger(width) && width > 0)

  if (widths.length === 0) {
    throw new Error(
      "Informe ao menos uma largura positiva, por exemplo: 640,960,1440",
    )
  }

  return [...new Set(widths)].sort((a, b) => a - b)
}

async function main() {
  const [input, slug, widthList] = process.argv.slice(2)

  if (!input || !slug) {
    throw new Error(
      "Uso: npm run assets:optimize -- <arquivo-fonte> <slug> [640,960,1440]",
    )
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "O slug deve usar apenas letras minúsculas, números e hífens.",
    )
  }

  const inputPath = resolve(input)
  const widths = parseWidths(widthList)
  const metadata = await sharp(inputPath).metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error(
      `Não foi possível ler as dimensões de ${basename(inputPath)}.`,
    )
  }

  const outputDirectory = resolve(OUTPUT_ROOT, slug)
  await mkdir(outputDirectory, { recursive: true })

  const outputs = []

  for (const width of widths) {
    const height = Math.round((width * 2) / 3)
    const base = sharp(inputPath).rotate().resize({
      width,
      height,
      fit: "cover",
      position: "attention",
      withoutEnlargement: true,
    })

    for (const format of ["avif", "webp"]) {
      const outputPath = resolve(outputDirectory, `${slug}-${width}.${format}`)
      const result =
        format === "avif"
          ? await base
              .clone()
              .avif({ quality: 58, effort: 5 })
              .toFile(outputPath)
          : await base
              .clone()
              .webp({ quality: 76, effort: 5, smartSubsample: true })
              .toFile(outputPath)

      outputs.push({
        path: outputPath.replace(`${process.cwd()}\\`, ""),
        width: result.width,
        height: result.height,
        bytes: result.size,
      })
    }
  }

  process.stdout.write(`${JSON.stringify(outputs, null, 2)}\n`)
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  )
  process.exitCode = 1
})
