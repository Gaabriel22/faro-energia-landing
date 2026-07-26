import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

const tones = {
  canvas: "bg-canvas text-ink",
  paper: "bg-paper text-ink",
  forest: "bg-forest text-canvas",
  solar: "bg-solar text-forest-deep",
} as const

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: keyof typeof tones
}

export function Section({
  className,
  tone = "canvas",
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      data-tone={tone}
      className={cn("relative isolate py-section", tones[tone], className)}
      {...props}
    />
  )
}
