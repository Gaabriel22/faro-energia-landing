import { ArrowDown } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent } from "@/content"
import { DeferredSavingsEstimator } from "@/features/savings-estimator/deferred-savings-estimator"

export function SavingsEstimatorSection() {
  const { estimator } = faroLandingContent

  return (
    <Section
      id="simulador"
      tone="paper"
      aria-labelledby="estimator-title"
      className="overflow-hidden"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <header className="relative lg:col-span-5 lg:pt-8">
          <span
            aria-hidden
            className="absolute -top-10 right-0 -z-10 font-heading text-[clamp(10rem,24vw,21rem)] leading-none tracking-[-0.08em] text-solar/28 lg:-right-12"
          >
            80
          </span>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-forest uppercase">
            <span aria-hidden className="h-px w-9 bg-forest" />
            {estimator.eyebrow}
          </p>
          <h2
            id="estimator-title"
            className="max-w-[10ch] font-heading text-headline text-balance"
          >
            {estimator.title}
          </h2>
          <p className="mt-7 max-w-[40ch] text-lg leading-relaxed text-ink/68">
            {estimator.description}
          </p>

          <ol
            aria-label="Como usar o simulador"
            className="mt-9 grid gap-4 border-t border-ink/18 pt-6 text-sm font-semibold text-ink/72 sm:grid-cols-3 lg:grid-cols-1"
          >
            {["Informe sua conta", "Veja a projeção", "Peça uma análise"].map(
              (step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-forest text-xs text-solar">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ),
            )}
          </ol>

          <ArrowDown
            aria-hidden
            className="mt-10 hidden size-12 text-solar lg:block"
            strokeWidth={1}
          />
        </header>

        <div className="lg:col-span-7">
          <DeferredSavingsEstimator disclaimer={estimator.disclaimer} />
        </div>
      </Container>
    </Section>
  )
}
