"use client"

import { useEffect, useRef, useState } from "react"

export function useDeferredVisibility<T extends HTMLElement>(
  rootMargin = "900px 0px",
) {
  const targetRef = useRef<T>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const target = targetRef.current

    if (!target || !("IntersectionObserver" in window)) {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setIsNearViewport(true)
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [rootMargin])

  return { isNearViewport, targetRef }
}
