import { ArrowUpRight } from "lucide-react"

import { faroLandingContent } from "@/content"

export function MobileCta() {
  const { action } = faroLandingContent.finalCta

  return (
    <aside
      aria-label="Atalho para simulação"
      data-testid="mobile-cta"
      className="mobile-cta-safe-area fixed inset-x-0 bottom-0 z-40 border-t border-canvas/16 bg-forest-deep/96 px-4 pt-3 text-canvas shadow-[0_-12px_40px_-24px_oklch(0.205_0.022_156/80%)] backdrop-blur-md lg:hidden"
    >
      <a
        href={action.href}
        className="mx-auto flex min-h-12 max-w-md items-center justify-between rounded-full bg-solar px-5 text-sm font-bold text-forest-deep"
      >
        {action.label}
        <ArrowUpRight aria-hidden className="size-4" />
      </a>
    </aside>
  )
}
