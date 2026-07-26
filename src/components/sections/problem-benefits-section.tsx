import { BrandIcon, type BrandIconName } from "@/components/brand/brand-icon"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent } from "@/content"

const benefitIcons: Record<string, BrandIconName> = {
  previsibilidade: "savings",
  operacao: "roof",
  engenharia: "shield",
}

export function ProblemBenefitsSection() {
  const { problem, benefits } = faroLandingContent

  return (
    <Section
      id="beneficios"
      aria-labelledby="benefits-title"
      className="technical-grid overflow-hidden"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <header className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-forest uppercase">
              <span aria-hidden className="h-px w-9 bg-forest" />
              {problem.eyebrow}
            </p>
            <h2
              id="benefits-title"
              className="max-w-[12ch] font-heading text-headline text-balance"
            >
              {problem.title}
            </h2>
          </header>

          <div className="flex items-end lg:col-span-4">
            <p className="max-w-[44ch] border-l-2 border-solar pl-5 text-lg leading-relaxed text-ink/72">
              {problem.description}
            </p>
          </div>
        </div>

        <ul className="mt-16 grid border-t border-ink/18 md:grid-cols-3 lg:mt-24">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.id}
              className="group relative border-b border-ink/18 py-8 md:border-r md:border-b-0 md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-10 lg:px-10"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-solar">
                  <BrandIcon
                    name={benefitIcons[benefit.id] ?? "savings"}
                    className="size-6"
                  />
                </span>
                <span
                  aria-hidden
                  className="font-heading text-4xl leading-none text-ink/18"
                >
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-9 max-w-[14ch] font-heading text-3xl leading-none tracking-[-0.025em]">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-[35ch] text-sm leading-relaxed text-ink/66">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
