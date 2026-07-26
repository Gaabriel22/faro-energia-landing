import { Container } from "@/components/layout/container"
import { faroLandingContent } from "@/content"

export function TrustBand() {
  const { proof } = faroLandingContent

  return (
    <aside
      aria-labelledby="trust-band-title"
      className="relative z-20 bg-solar text-forest-deep"
    >
      <Container
        size="wide"
        className="grid border-x border-forest-deep/16 lg:grid-cols-[1.2fr_3fr]"
      >
        <div className="flex items-center border-b border-forest-deep/16 py-7 lg:border-r lg:border-b-0 lg:pr-10">
          <h2
            id="trust-band-title"
            className="max-w-[25ch] text-xs font-bold tracking-[0.17em] uppercase"
          >
            {proof.label}
          </h2>
        </div>

        <dl className="grid sm:grid-cols-3">
          {proof.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-forest-deep/16 py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-7 sm:last:border-r-0 lg:px-9"
            >
              <dt className="mt-1 max-w-[18ch] text-xs font-semibold leading-snug text-forest-deep/68">
                {stat.label}
              </dt>
              <dd className="order-first font-heading text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </aside>
  )
}
