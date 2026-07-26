const RESPONSIVE_WIDTHS = [640, 960, 1440] as const

type ResponsiveWidth = (typeof RESPONSIVE_WIDTHS)[number]

type FaroImage = {
  alt: string
  width: 1536
  height: 1024
  variants: ReadonlyArray<{
    width: ResponsiveWidth
    height: number
    avif: string
    webp: string
  }>
}

function createImage(slug: string, alt: string): FaroImage {
  return {
    alt,
    width: 1536,
    height: 1024,
    variants: RESPONSIVE_WIDTHS.map((width) => ({
      width,
      height: Math.round((width * 2) / 3),
      avif: `/images/generated/${slug}/${slug}-${width}.avif`,
      webp: `/images/generated/${slug}/${slug}-${width}.webp`,
    })),
  }
}

export const faroMedia = {
  hero: createImage(
    "faro-hero",
    "Empreendedora em uma padaria observa o telhado equipado com painéis solares.",
  ),
  projects: {
    padariaAurora: createImage(
      "padaria-aurora",
      "Painéis solares instalados no telhado de uma padaria brasileira.",
    ),
    clinicaVereda: createImage(
      "clinica-vereda",
      "Equipe inspeciona painéis solares no telhado de uma clínica.",
    ),
    centroAutoNovaLinha: createImage(
      "centro-auto-nova-linha",
      "Oficina automotiva com painéis solares sobre a cobertura metálica.",
    ),
  },
} as const

export type { FaroImage }
