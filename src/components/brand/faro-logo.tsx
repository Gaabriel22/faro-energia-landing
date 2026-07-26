import type { ComponentPropsWithoutRef } from "react"

import { FaroMark } from "@/components/brand/faro-mark"
import { cn } from "@/lib/utils"

type FaroLogoProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  inverted?: boolean
}

export function FaroLogo({
  className,
  inverted = false,
  ...props
}: FaroLogoProps) {
  return (
    <div
      role="img"
      aria-label="Faro Energia"
      className={cn(
        "inline-flex items-center gap-3",
        inverted ? "text-canvas" : "text-forest-deep",
        className,
      )}
      {...props}
    >
      <FaroMark aria-hidden className="size-9" />
      <span aria-hidden className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-bold tracking-[0.18em]">FARO</span>
        <span className="mt-1 text-[0.56rem] font-semibold tracking-[0.32em] opacity-70">
          ENERGIA
        </span>
      </span>
    </div>
  )
}
