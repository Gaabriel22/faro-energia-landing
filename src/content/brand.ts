export const faroBrand = {
  name: "Faro Energia",
  shortName: "Faro",
  signature: "Energia própria. Negócio mais leve.",
  serviceArea: "São Paulo e interior",
  primaryCta: {
    href: "#simulador",
    label: "Simular minha economia",
  },
  secondaryCta: {
    href: "#como-funciona",
    label: "Conhecer o processo",
  },
  navigation: [
    { href: "#economia", label: "Economia" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#projetos", label: "Projetos" },
    { href: "#duvidas", label: "Dúvidas" },
  ],
} as const

export type FaroBrand = typeof faroBrand
