import { ArrowUpRight } from "lucide-react"

import { FaroLogo } from "@/components/brand/faro-logo"
import { Container } from "@/components/layout/container"
import {
  MobileNavigation,
  type NavigationItem,
} from "@/components/navigation/mobile-navigation"
import { buttonVariants } from "@/components/ui/button"
import { faroLandingContent } from "@/content"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#projetos", label: "Projetos" },
  { href: "#duvidas", label: "Dúvidas" },
] as const satisfies readonly NavigationItem[]

export function SiteHeader() {
  const cta = faroLandingContent.hero.primaryCta

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-canvas/12 bg-forest-deep/94 text-canvas backdrop-blur-md">
      <Container
        size="wide"
        className="relative flex min-h-19 items-center justify-between gap-6"
      >
        <a
          href="#inicio"
          aria-label="Faro Energia — início"
          className="rounded-sm"
        >
          <FaroLogo inverted className="scale-90 origin-left sm:scale-100" />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-canvas/76 hover:text-solar lg:px-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={cta.href}
          className={cn(
            buttonVariants(),
            "hidden bg-solar text-forest-deep hover:bg-solar-soft lg:inline-flex",
          )}
        >
          {cta.label}
          <ArrowUpRight aria-hidden data-icon="inline-end" />
        </a>

        <MobileNavigation items={navigationItems} cta={cta} />
      </Container>
    </header>
  )
}
