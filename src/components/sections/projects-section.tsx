import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent, faroMedia, type FaroImage } from "@/content"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

const projectImages = {
  "padaria-aurora": faroMedia.projects.padariaAurora,
  "clinica-vereda": faroMedia.projects.clinicaVereda,
  "auto-nova-linha": faroMedia.projects.centroAutoNovaLinha,
} satisfies Record<string, FaroImage>

function ProjectImage({ image, sizes }: { image: FaroImage; sizes: string }) {
  const avifSrcSet = image.variants
    .map(({ avif, width }) => `${avif} ${width}w`)
    .join(", ")
  const webpSrcSet = image.variants
    .map(({ webp, width }) => `${webp} ${width}w`)
    .join(", ")
  const largest = image.variants.at(-1)!

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <Image
        src={largest.webp}
        alt={image.alt}
        fill
        unoptimized
        sizes={sizes}
        className="object-cover"
      />
    </picture>
  )
}

export function ProjectsSection() {
  const { projects } = faroLandingContent

  return (
    <Section
      id="projetos"
      tone="paper"
      aria-labelledby="projects-title"
      className="overflow-hidden"
    >
      <Container>
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-forest uppercase">
              {projects.eyebrow}
            </p>
            <h2
              id="projects-title"
              className="max-w-[11ch] font-heading text-headline text-balance"
            >
              {projects.title}
            </h2>
          </div>
          <p className="max-w-[40ch] border-l-2 border-solar pl-5 text-lg leading-relaxed text-ink/68 lg:col-span-4">
            {projects.description}
          </p>
        </header>

        <ol className="mt-14 grid gap-px bg-ink/18 border border-ink/18 lg:grid-cols-12 lg:mt-20">
          {projects.items.map((project, index) => {
            const image = projectImages[project.id]
            const isWide = index === projects.items.length - 1
            const imageSizes =
              index === 0
                ? "(max-width: 1023px) 100vw, 58vw"
                : index === 1
                  ? "(max-width: 1023px) 100vw, 42vw"
                  : "(max-width: 1023px) 100vw, 50vw"

            return (
              <li
                key={project.id}
                className={cn(
                  "bg-paper",
                  index === 0 && "lg:col-span-7",
                  index === 1 && "lg:col-span-5",
                  isWide && "lg:col-span-12",
                )}
              >
                <article
                  className={cn("h-full", isWide && "lg:grid lg:grid-cols-2")}
                  aria-labelledby={`${project.id}-title`}
                >
                  <div
                    className={cn(
                      "relative aspect-3/2 overflow-hidden bg-muted",
                      isWide && "lg:aspect-auto lg:min-h-116",
                    )}
                  >
                    <ProjectImage image={image} sizes={imageSizes} />
                    <span className="absolute top-4 left-4 bg-solar px-3 py-2 text-xs font-bold tracking-[0.12em] text-forest-deep uppercase">
                      Projeto 0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-col p-6 sm:p-8 lg:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/16 pb-5 text-xs font-bold tracking-widest text-ink/62 uppercase">
                      <span>{project.city}</span>
                      <span>{project.systemSize}</span>
                    </div>
                    <h3
                      id={`${project.id}-title`}
                      className="mt-7 font-heading text-[clamp(2.1rem,4vw,4rem)] leading-none tracking-[-0.035em]"
                    >
                      {project.business}
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink/66">
                      {project.summary}
                    </p>

                    <dl className="mt-9 grid grid-cols-2 gap-5 border-t border-ink/16 pt-6">
                      <div>
                        <dt className="max-w-[15ch] text-[0.65rem] font-bold tracking-widest text-ink/72 uppercase">
                          Conta mensal anterior
                        </dt>
                        <dd className="mt-2 font-heading text-2xl leading-none">
                          {formatCurrency(project.previousMonthlyBill)}
                        </dd>
                      </div>
                      <div>
                        <dt className="max-w-[15ch] text-[0.65rem] font-bold tracking-widest text-ink/72 uppercase">
                          Economia mensal estimada
                        </dt>
                        <dd className="mt-2 font-heading text-2xl leading-none text-forest">
                          {formatCurrency(project.estimatedMonthlySavings)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>

        <p className="mt-5 text-xs leading-relaxed text-ink/68">
          Valores ilustrativos de economia projetada, sujeitos ao perfil de
          consumo e à análise técnica de cada instalação.
        </p>
      </Container>
    </Section>
  )
}
