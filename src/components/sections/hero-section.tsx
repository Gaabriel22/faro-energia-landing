import Image from "next/image"
import { ArrowDown, ArrowUpRight, Check } from "lucide-react"

import { SolarRay } from "@/components/brand/solar-ray"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { faroLandingContent, faroMedia } from "@/content"
import { cn } from "@/lib/utils"

const heroImage = faroMedia.hero
const heroAvifSrcSet = heroImage.variants
  .map(({ avif, width }) => `${avif} ${width}w`)
  .join(", ")
const heroWebpSrcSet = heroImage.variants
  .map(({ webp, width }) => `${webp} ${width}w`)
  .join(", ")
const largestHero = heroImage.variants.at(-1)!

export function HeroSection() {
  const { hero, proof } = faroLandingContent

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh overflow-hidden bg-forest text-canvas"
    >
      <SolarRay className="motion-hero-ray absolute -right-140 -top-32 z-10 h-176 w-176 rotate-6 text-solar opacity-60 sm:-right-112 sm:h-208 sm:w-208 lg:right-16 lg:-top-36 lg:h-248 lg:w-248 lg:opacity-70" />

      <Container
        size="wide"
        className="relative grid min-h-svh grid-cols-1 pt-31 lg:grid-cols-12 lg:pt-19"
      >
        <div className="relative z-20 flex flex-col justify-center pb-12 lg:col-span-7 lg:py-20 lg:pr-12 xl:col-span-6">
          <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.2em] text-solar uppercase sm:text-xs">
            <span aria-hidden className="h-px w-9 bg-solar" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="max-w-[10.5ch] font-heading text-[clamp(3.25rem,12.5vw,7rem)] leading-[0.89] tracking-[-0.052em] text-balance"
          >
            {hero.title}
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-canvas/76 sm:mt-7 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "motion-interactive min-h-13 bg-solar px-7 text-forest-deep hover:bg-solar-soft",
              )}
            >
              {hero.primaryCta.label}
              <ArrowUpRight aria-hidden data-icon="inline-end" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "motion-interactive min-h-13 border-canvas/35 text-canvas hover:border-canvas hover:bg-canvas hover:text-forest-deep",
              )}
            >
              {hero.secondaryCta.label}
              <ArrowDown aria-hidden data-icon="inline-end" />
            </a>
          </div>

          <div
            data-testid="hero-trust-note"
            className="mt-7 flex max-w-xl items-start gap-3 border-t border-canvas/18 pt-5 text-sm text-canvas/72"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-solar text-forest-deep">
              <Check aria-hidden className="size-3.5" strokeWidth={3} />
            </span>
            <p>
              <strong className="font-semibold text-canvas">
                {proof.stats[0].value} {proof.stats[0].label}.
              </strong>{" "}
              {hero.trustNote}.
            </p>
          </div>
        </div>

        <div className="relative z-0 -mx-gutter min-h-108 lg:col-span-5 lg:mx-0 lg:min-h-0 xl:col-span-6">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-forest to-transparent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-28 lg:bg-linear-to-r"
          />
          <picture>
            <source
              type="image/avif"
              srcSet={heroAvifSrcSet}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            <source
              type="image/webp"
              srcSet={heroWebpSrcSet}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            <Image
              src={largestHero.webp}
              alt={heroImage.alt}
              fill
              fetchPriority="high"
              unoptimized
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="motion-hero-image object-cover object-[58%_center] lg:object-center"
            />
          </picture>
          <div className="motion-hero-caption absolute right-gutter bottom-6 z-20 max-w-52 border-l border-solar bg-forest-deep/82 px-4 py-3 text-xs leading-relaxed text-canvas backdrop-blur-sm lg:right-6 lg:bottom-8">
            Projeto dimensionado para consumo, cobertura e rotina do negócio.
          </div>
        </div>
      </Container>
    </section>
  )
}
