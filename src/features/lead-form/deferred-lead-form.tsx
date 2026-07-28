"use client"

import { useEffect, useState, type ComponentType } from "react"

import type { LeadFormState } from "@/features/lead-form/state"
import { useDeferredVisibility } from "@/hooks/use-deferred-visibility"

type LeadFormAction = (
  previousState: LeadFormState,
  formData: FormData,
) => Promise<LeadFormState>

export function DeferredLeadForm({ action }: { action: LeadFormAction }) {
  const { isNearViewport, targetRef } = useDeferredVisibility<HTMLDivElement>()
  const [Form, setForm] = useState<ComponentType<{
    action: LeadFormAction
  }> | null>(null)

  useEffect(() => {
    if (!isNearViewport || Form) return

    let isMounted = true

    void import("@/features/lead-form/lead-form").then((module) => {
      if (isMounted) setForm(() => module.LeadForm)
    })

    return () => {
      isMounted = false
    }
  }, [Form, isNearViewport])

  return (
    <div ref={targetRef}>
      {Form ? (
        <Form action={action} />
      ) : (
        <div
          role="status"
          aria-label="Carregando formulário"
          className="grid min-h-132 gap-5"
        >
          {[0, 1, 2, 3, 4].map((field) => (
            <div key={field} className="grid gap-2">
              <span className="h-3 w-24 bg-ink/12" />
              <span className="h-12 rounded-xl bg-canvas/70" />
            </div>
          ))}
          <span className="sr-only">Carregando formulário de avaliação.</span>
        </div>
      )}
    </div>
  )
}
