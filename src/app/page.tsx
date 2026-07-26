import { FaroLogo } from "@/components/brand/faro-logo"
import { SolarRay } from "@/components/brand/solar-ray"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroBrand, faroLandingContent } from "@/content"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Section
        tone="forest"
        className="min-h-svh overflow-hidden py-0"
        aria-labelledby="brand-title"
      >
        <SolarRay className="absolute inset-y-0 right-[-72%] h-full w-[110%] text-solar opacity-[0.55] sm:right-[-22%] sm:w-[80%] sm:opacity-90" />
        <Container className="relative flex min-h-svh flex-col justify-between py-6 sm:py-9">
          <FaroLogo inverted />

          <div className="max-w-4xl py-16">
            <p className="mb-6 max-w-max border-l-2 border-solar pl-4 text-xs font-bold tracking-[0.2em] uppercase">
              {faroLandingContent.hero.eyebrow}
            </p>
            <h1
              id="brand-title"
              className="max-w-[11ch] font-heading text-display text-balance"
            >
              {faroLandingContent.hero.title}
            </h1>
            <p className="mt-8 max-w-[57ch] text-base leading-relaxed text-canvas/72 sm:text-lg">
              {faroLandingContent.hero.description}
            </p>
          </div>

          <p className="border-t border-canvas/18 pt-5 text-sm font-semibold tracking-wide text-canvas/72">
            {faroBrand.signature}
          </p>
        </Container>
      </Section>
    </main>
  )
}
