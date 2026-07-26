import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/utils"

const iconPaths = {
  roof: (
    <>
      <path d="m4 15 8-7 8 7" />
      <path d="M7 13.5V20h10v-6.5M9.5 11.3l5 4.4" />
      <path d="M17.5 4.5v3M16 6h3" />
    </>
  ),
  savings: (
    <>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M14.8 8.2c-2.7-.9-5.3-.2-5.3 1.7 0 3 5.8 1.5 5.8 4.2 0 1.9-2.6 2.6-5.5 1.6M12 6.5v11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V6l7-2.5Z" />
      <path d="m8.8 12 2.1 2.1 4.6-4.7" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type BrandIconName = keyof typeof iconPaths

type BrandIconProps = ComponentPropsWithoutRef<"svg"> & {
  name: BrandIconName
  title?: string
}

export function BrandIcon({
  className,
  name,
  title,
  ...props
}: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {iconPaths[name]}
    </svg>
  )
}
