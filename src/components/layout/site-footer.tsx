import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react"

import { FaroLogo } from "@/components/brand/faro-logo"
import { Container } from "@/components/layout/container"
import { faroBrand, faroLandingContent } from "@/content"

export function SiteFooter() {
  const { footer } = faroLandingContent

  return (
    <footer className="bg-forest-deep text-canvas">
      <Container>
        <div className="grid gap-12 border-t border-canvas/16 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-18">
          <div className="lg:col-span-5">
            <a
              href="#inicio"
              aria-label="Faro Energia — voltar ao início"
              className="inline-flex rounded-sm"
            >
              <FaroLogo inverted />
            </a>
            <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-canvas/58">
              {footer.description}
            </p>
          </div>

          <address className="not-italic lg:col-span-4">
            <p className="text-xs font-bold tracking-[0.16em] text-solar uppercase">
              {footer.contactLabel}
            </p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-sm font-semibold underline decoration-canvas/30 underline-offset-5 hover:decoration-solar"
            >
              <Mail aria-hidden className="size-4 text-solar" />
              {footer.email}
            </a>
            <p className="mt-3 flex items-center gap-3 text-sm text-canvas/58">
              <MapPin aria-hidden className="size-4 text-solar" />
              {faroBrand.serviceArea}
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm text-canvas/58">
              <Clock3 aria-hidden className="size-4 text-solar" />
              {footer.availability}
            </p>
          </address>

          <nav aria-label={footer.navigationLabel} className="lg:col-span-3">
            <p className="text-xs font-bold tracking-[0.16em] text-solar uppercase">
              {footer.navigationLabel}
            </p>
            <ul className="mt-4">
              {faroBrand.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-canvas/72 hover:text-canvas"
                  >
                    {item.label}
                    <ArrowUpRight aria-hidden className="size-3.5 text-solar" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-canvas/16 py-6 text-xs text-canvas/62 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <p>Projeto, instalação e acompanhamento em uma só equipe.</p>
        </div>
      </Container>
    </footer>
  )
}
