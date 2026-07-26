import { BrandIcon } from "@/components/brand/brand-icon"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent } from "@/content"

export function GuaranteesSection() {
  const { guarantees } = faroLandingContent

  return (
    <Section
      id="garantias"
      tone="solar"
      aria-labelledby="guarantees-title"
      className="overflow-hidden"
    >
      <Container>
        <header className="grid gap-8 border-b border-forest-deep/22 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] uppercase">
              {guarantees.eyebrow}
            </p>
            <h2
              id="guarantees-title"
              className="max-w-[12ch] font-heading text-headline text-balance"
            >
              {guarantees.title}
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:col-span-4 lg:justify-end">
            <span className="grid size-14 place-items-center rounded-full border border-forest-deep/35">
              <BrandIcon name="shield" className="size-7" />
            </span>
            <p className="max-w-[20ch] text-xs font-bold tracking-[0.12em] uppercase">
              Proteção do equipamento à instalação
            </p>
          </div>
        </header>

        <ul>
          {guarantees.items.map((guarantee) => (
            <li
              key={guarantee.id}
              className="grid gap-5 border-b border-forest-deep/22 py-8 sm:grid-cols-[10rem_1fr] lg:grid-cols-[14rem_1fr_1fr] lg:items-center lg:gap-10 lg:py-9"
            >
              <p className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">
                {guarantee.term}
              </p>
              <h3 className="max-w-[18ch] font-heading text-3xl leading-none tracking-tight">
                {guarantee.title}
              </h3>
              <p className="max-w-[42ch] text-sm leading-relaxed text-forest-deep/72 sm:col-start-2 lg:col-start-auto">
                {guarantee.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
