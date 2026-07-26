import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { buttonVariants } from "@/components/ui/button"
import { faroLandingContent } from "@/content"
import { cn } from "@/lib/utils"

export function ProcessSection() {
  const { process, hero } = faroLandingContent

  return (
    <Section
      id="como-funciona"
      tone="forest"
      aria-labelledby="process-title"
      className="overflow-hidden bg-forest-deep"
    >
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <header className="self-start lg:sticky lg:top-32 lg:col-span-5">
          <p className="mb-5 text-xs font-bold tracking-[0.18em] text-solar uppercase">
            {process.eyebrow}
          </p>
          <h2
            id="process-title"
            className="max-w-[10ch] font-heading text-headline text-balance"
          >
            {process.title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-canvas/68">
            {process.description}
          </p>
          <a
            href={hero.primaryCta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 bg-solar text-forest-deep hover:bg-solar-soft",
            )}
          >
            {hero.primaryCta.label}
            <ArrowUpRight aria-hidden data-icon="inline-end" />
          </a>
        </header>

        <ol className="relative border-t border-canvas/20 lg:col-span-7">
          {process.steps.map((step) => (
            <li
              key={step.id}
              className="grid gap-5 border-b border-canvas/20 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 lg:py-10"
            >
              <span
                aria-hidden
                className="font-heading text-5xl leading-none text-solar"
              >
                {step.step}
              </span>
              <div className="grid gap-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-8">
                <h3 className="font-heading text-3xl leading-none tracking-tight">
                  {step.title}
                </h3>
                <p className="max-w-[38ch] text-sm leading-relaxed text-canvas/66">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
