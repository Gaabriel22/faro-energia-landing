import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type FaroMarkProps = ComponentPropsWithoutRef<"svg"> & {
  title?: string
}

export function FaroMark({ className, title, ...props }: FaroMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M7 37.5 21.2 10h18.1L25.1 37.5H7Z" fill="currentColor" />
      <path
        d="M23.7 18.6h12.1M18.9 27.9h12.2"
        stroke="var(--primitive-solar)"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  )
}
