"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavigationItem = {
  href: `#${string}`
  label: string
}

type MobileNavigationProps = {
  items: readonly NavigationItem[]
  cta: NavigationItem
}

export function MobileNavigation({ items, cta }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return

      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-11 items-center gap-2 rounded-full border border-canvas/24 px-4 text-sm font-semibold text-canvas hover:border-solar hover:text-solar"
      >
        {isOpen ? (
          <X aria-hidden className="size-4" />
        ) : (
          <Menu aria-hidden className="size-4" />
        )}
        Menu
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-canvas/12 bg-forest-deep px-gutter pb-6 shadow-2xl"
        >
          <nav aria-label="Navegação móvel">
            <ul className="divide-y divide-canvas/12">
              {items.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex min-h-14 items-center justify-between py-3 font-semibold text-canvas"
                  >
                    <span className="mr-5 text-xs tabular-nums text-canvas/45">
                      0{index + 1}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    <ArrowUpRight aria-hidden className="size-4 text-solar" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={cta.href}
              onClick={closeMenu}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-5 w-full bg-solar text-forest-deep hover:bg-solar-soft",
              )}
            >
              {cta.label}
              <ArrowUpRight aria-hidden data-icon="inline-end" />
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  )
}

export type { NavigationItem }
