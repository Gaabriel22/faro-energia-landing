import { Check, Clock3, ShieldCheck } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { submitLead } from "@/features/lead-form/actions"
import { LeadForm } from "@/features/lead-form/lead-form"

const assurances = [
  {
    icon: Clock3,
    title: "Retorno em 1 dia útil",
    description: "Uma conversa objetiva com quem entende do projeto.",
  },
  {
    icon: ShieldCheck,
    title: "Diagnóstico sem custo",
    description: "Sem compromisso e sem proposta antes da análise.",
  },
] as const

export function LeadFormSection() {
  return (
    <Section
      id="orcamento"
      tone="canvas"
      aria-labelledby="lead-form-title"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden
        className="technical-grid absolute inset-0 -z-10 opacity-45"
      />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <header className="lg:col-span-5 lg:pt-8">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-forest uppercase">
            <span aria-hidden className="h-px w-9 bg-forest" />
            Próximo passo
          </p>
          <h2
            id="lead-form-title"
            className="max-w-[10ch] font-heading text-headline text-balance"
          >
            Uma proposta começa com cinco respostas.
          </h2>
          <p className="mt-7 max-w-[39ch] text-lg leading-relaxed text-ink/68">
            Conte o essencial sobre o seu negócio. A engenharia cruza consumo,
            operação e espaço disponível antes de falar em equipamentos.
          </p>

          <div className="mt-10 border-t border-ink/18">
            {assurances.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/18 py-5"
              >
                <span className="grid size-10 place-items-center rounded-full bg-solar text-forest-deep">
                  <Icon aria-hidden className="size-4.5" />
                </span>
                <div>
                  <h3 className="font-semibold text-forest-deep">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest">
            <Check aria-hidden className="size-4 text-forest" />
            Só os dados necessários para dimensionar o próximo passo
          </p>
        </header>

        <div className="lg:col-span-7">
          <div className="relative border border-ink/16 bg-paper p-6 shadow-(--shadow-card) sm:p-9 lg:p-11">
            <span
              aria-hidden
              className="absolute top-0 left-0 h-1.5 w-28 bg-solar"
            />
            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.16em] text-forest uppercase">
                Avaliação técnica inicial
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Campos com <span aria-hidden>*</span> são obrigatórios.
              </p>
            </div>
            <LeadForm action={submitLead} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
