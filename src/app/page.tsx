import { SiteHeader } from "@/components/navigation/site-header"
import { GuaranteesSection } from "@/components/sections/guarantees-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProblemBenefitsSection } from "@/components/sections/problem-benefits-section"
import { ProcessSection } from "@/components/sections/process-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TrustBand } from "@/components/sections/trust-band"

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-100 -translate-y-24 rounded-full bg-solar px-5 py-3 font-semibold text-forest-deep shadow-lg focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="overflow-hidden">
        <HeroSection />
        <TrustBand />
        <ProblemBenefitsSection />
        <ProcessSection />
        <ProjectsSection />
        <TestimonialsSection />
        <GuaranteesSection />
      </main>
    </>
  )
}
