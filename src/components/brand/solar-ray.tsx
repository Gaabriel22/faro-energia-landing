import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type SolarRayProps = ComponentPropsWithoutRef<"svg"> & {
  title?: string
}

export function SolarRay({ className, title, ...props }: SolarRayProps) {
  return (
    <svg
      viewBox="0 0 960 960"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("pointer-events-none", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M698-120 224 472h284L326 1080 796 430H522L698-120Z"
        fill="currentColor"
      />
      <path
        d="M-64 710 574-88M368 1048 1018 234"
        stroke="currentColor"
        strokeWidth="2"
        opacity=".28"
      />
    </svg>
  )
}
