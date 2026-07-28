"use client"

import { useEffect, useState, type ComponentType } from "react"

import { useDeferredVisibility } from "@/hooks/use-deferred-visibility"

type DeferredSavingsEstimatorProps = {
  disclaimer: string
}

export function DeferredSavingsEstimator({
  disclaimer,
}: DeferredSavingsEstimatorProps) {
  const { isNearViewport, targetRef } = useDeferredVisibility<HTMLDivElement>()
  const [Estimator, setEstimator] =
    useState<ComponentType<DeferredSavingsEstimatorProps> | null>(null)

  useEffect(() => {
    if (!isNearViewport || Estimator) return

    let isMounted = true

    void import("@/features/savings-estimator/savings-estimator").then(
      (module) => {
        if (isMounted) setEstimator(() => module.SavingsEstimator)
      },
    )

    return () => {
      isMounted = false
    }
  }, [Estimator, isNearViewport])

  return (
    <div ref={targetRef}>
      {Estimator ? (
        <Estimator disclaimer={disclaimer} />
      ) : (
        <div
          role="status"
          aria-label="Carregando simulador"
          className="min-h-188 overflow-hidden border border-forest-deep/22 bg-solar text-forest-deep shadow-(--shadow-soft) sm:min-h-140"
        >
          <div className="flex items-center justify-between border-b border-forest-deep/22 px-5 py-4 sm:px-7">
            <span className="h-3 w-32 bg-forest-deep/16" />
            <span className="h-3 w-24 bg-forest-deep/12" />
          </div>
          <div className="grid gap-5 px-5 py-7 sm:px-7 sm:py-9">
            <span className="h-4 w-3/5 bg-forest-deep/14" />
            <span className="h-18 bg-paper/70" />
            <span className="h-12 rounded-full bg-forest-deep/18" />
          </div>
          <span className="sr-only">Carregando simulador de economia.</span>
        </div>
      )}
    </div>
  )
}
