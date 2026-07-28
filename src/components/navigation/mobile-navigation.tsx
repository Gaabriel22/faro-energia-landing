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
  return (
    <>
      <details data-mobile-navigation className="group lg:hidden">
        <summary
          role="button"
          aria-controls="mobile-navigation"
          className="motion-interactive flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-canvas/24 px-4 text-sm font-semibold text-canvas hover:border-solar hover:text-solar [&::-webkit-details-marker]:hidden"
        >
          <span className="group-open:hidden">
            <MenuIcon open={false} />
          </span>
          <span className="hidden group-open:inline-flex">
            <MenuIcon open />
          </span>
          Menu
        </summary>

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
              className="motion-interactive mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-solar px-6 text-base font-semibold whitespace-nowrap text-forest-deep shadow-(--shadow-button) outline-none hover:bg-solar-soft focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              {cta.label}
              <NavArrowIcon />
            </a>
          </nav>
        </div>
      </details>
      <script src="/mobile-navigation.js" defer />
    </>
  )
}

export type { NavigationItem }
