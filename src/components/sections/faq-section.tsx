import { Plus } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent } from "@/content"

export function FaqSection() {
  const { faq } = faroLandingContent

  return (
    <Section
      id="duvidas"
      aria-labelledby="faq-title"
      className="technical-grid overflow-hidden"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-forest uppercase">
              {faq.eyebrow}
            </p>
            <h2
              id="faq-title"
              className="max-w-[10ch] font-heading text-headline text-balance"
            >
              {faq.title}
            </h2>
            <p className="mt-7 max-w-[34ch] text-base leading-relaxed text-ink/66">
              Respostas diretas para comparar o investimento com segurança,
              antes de pedir uma proposta.
            </p>
          </div>
        </header>

        <div className="border-t border-ink/20 lg:col-span-7">
          {faq.items.map((item, index) => (
            <details
              key={item.id}
              name="faro-faq"
              open={index === 0}
              className="group border-b border-ink/20"
            >
              <summary className="flex min-h-22 cursor-pointer list-none items-center gap-5 py-6 marker:content-none [&::-webkit-details-marker]:hidden">
                <h3 className="flex flex-1 items-center gap-5">
                  <span
                    aria-hidden
                    className="shrink-0 font-sans text-xs font-bold tracking-[0.16em] text-forest/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-heading text-[clamp(1.45rem,3vw,2rem)] leading-tight tracking-[-0.02em]">
                    {item.question}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/25 text-forest group-open:bg-forest group-open:text-canvas">
                    <Plus aria-hidden className="size-4 group-open:rotate-45" />
                  </span>
                </h3>
              </summary>
              <p className="max-w-[62ch] pr-12 pb-8 pl-10 text-base leading-relaxed text-ink/68 sm:pl-12">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
