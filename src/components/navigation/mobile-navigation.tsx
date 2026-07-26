"use client"

import { useEffect, useRef, useState } from "react"

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

function NavArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4"
    >
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" />
      ) : (
        <path d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
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
        className="motion-interactive flex min-h-11 items-center gap-2 rounded-full border border-canvas/24 px-4 text-sm font-semibold text-canvas hover:border-solar hover:text-solar"
      >
        <MenuIcon open={isOpen} />
        Menu
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="motion-mobile-menu absolute inset-x-0 top-full max-h-[calc(100svh-4.75rem)] overflow-y-auto overscroll-contain border-t border-canvas/12 bg-forest-deep px-gutter pb-6 shadow-2xl"
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
                    <span className="text-solar">
                      <NavArrowIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={cta.href}
              onClick={closeMenu}
              className={cn(
                buttonVariants({ size: "lg" }),
                "motion-interactive mt-5 w-full bg-solar text-forest-deep hover:bg-solar-soft",
              )}
            >
              {cta.label}
              <NavArrowIcon />
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  )
}

export type { NavigationItem }
