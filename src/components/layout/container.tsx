import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "default" | "wide"
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-gutter",
        size === "wide"
          ? "max-w-(--container-wide)"
          : "max-w-(--container-default)",
        className,
      )}
      {...props}
    />
  )
}
