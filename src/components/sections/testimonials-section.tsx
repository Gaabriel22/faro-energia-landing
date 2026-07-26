import { Quote } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { faroLandingContent } from "@/content"

export function TestimonialsSection() {
  const { testimonials, testimonialsSection } = faroLandingContent

  return (
    <Section
      tone="forest"
      aria-labelledby="testimonials-title"
      className="overflow-hidden bg-forest-deep"
    >
      <Container>
        <header className="grid gap-6 border-b border-canvas/18 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-xs font-bold tracking-[0.18em] text-solar uppercase">
              {testimonialsSection.eyebrow}
            </p>
            <h2
              id="testimonials-title"
              className="max-w-[12ch] font-heading text-headline text-balance"
            >
              {testimonialsSection.title}
            </h2>
          </div>
          <Quote
            aria-hidden
            className="size-16 text-solar lg:col-span-4 lg:ml-auto lg:size-24"
            strokeWidth={1}
          />
        </header>

        <div className="grid lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.id}
              className="border-b border-canvas/18 py-10 last:border-b-0 lg:border-r lg:border-b-0 lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span
                aria-hidden
                className="text-xs font-bold tracking-[0.16em] text-solar uppercase"
              >
                Relato 0{index + 1}
              </span>
              <p className="mt-8 max-w-[27ch] font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em]">
                “{testimonial.quote}”
              </p>
              <footer className="mt-9 border-l border-solar pl-4">
                <cite className="not-italic">
                  <span className="block font-bold text-canvas">
                    {testimonial.author}
                  </span>
                  <span className="mt-1 block text-sm text-canvas/58">
                    {testimonial.role}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </Section>
  )
}
