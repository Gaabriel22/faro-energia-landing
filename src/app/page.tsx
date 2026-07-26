import { SiteHeader } from "@/components/navigation/site-header"
import { HeroSection } from "@/components/sections/hero-section"

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
      </main>
    </>
  )
}
