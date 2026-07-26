import { ArrowUpRight, Check } from "lucide-react"

import { SolarRay } from "@/components/brand/solar-ray"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { faroLandingContent } from "@/content"
import { cn } from "@/lib/utils"

export function FinalCtaSection() {
  const { finalCta } = faroLandingContent

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-forest-deep py-section text-canvas"
    >
      <SolarRay className="absolute -top-1/2 -right-120 -z-10 size-248 rotate-12 text-forest sm:-right-96 lg:-right-44" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 border-t border-canvas/16"
      />

      <Container className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <header className="lg:col-span-8">
          <p className="mb-5 text-xs font-bold tracking-[0.18em] text-solar uppercase">
            {finalCta.eyebrow}
          </p>
          <h2
            id="final-cta-title"
            className="max-w-[11ch] font-heading text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.9] tracking-tighter text-balance"
          >
            {finalCta.title}
          </h2>
        </header>

        <div className="lg:col-span-4 lg:pb-2">
          <p className="max-w-[34ch] text-lg leading-relaxed text-canvas/68">
            {finalCta.description}
          </p>
          <a
            href={finalCta.action.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "motion-interactive mt-8 min-h-13 bg-solar text-forest-deep hover:bg-solar-soft",
            )}
          >
            {finalCta.action.label}
            <ArrowUpRight aria-hidden data-icon="inline-end" />
          </a>
          <p className="mt-5 flex items-center gap-2 text-sm text-canvas/58">
            <Check aria-hidden className="size-4 text-solar" />
            Diagnóstico sem custo e sem compromisso
          </p>
        </div>
      </Container>
    </section>
  )
}
