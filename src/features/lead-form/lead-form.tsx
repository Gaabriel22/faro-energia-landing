"use client"

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LeadFormState } from "@/features/lead-form/state"
import { initialLeadFormState } from "@/features/lead-form/state"

type LeadFormAction = (
  previousState: LeadFormState,
  formData: FormData,
) => Promise<LeadFormState>

type LeadFormProps = {
  action: LeadFormAction
}

const monthlyBillOptions = [
  { value: "300-999", label: "De R$ 300 a R$ 999" },
  { value: "1000-2999", label: "De R$ 1.000 a R$ 2.999" },
  { value: "3000-9999", label: "De R$ 3.000 a R$ 9.999" },
  { value: "10000-29999", label: "De R$ 10.000 a R$ 29.999" },
  { value: "30000+", label: "R$ 30.000 ou mais" },
] as const

const visibleFieldOrder = [
  "name",
  "company",
  "email",
  "phone",
  "monthlyBillRange",
] as const

export function LeadForm({ action }: LeadFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const billRangeDetailsRef = useRef<HTMLDetailsElement>(null)
  const billRangeTriggerRef = useRef<HTMLElement>(null)
  const [serverState, formAction, isPending] = useActionState(
    action,
    initialLeadFormState,
  )
  const [clientState, setClientState] = useState<LeadFormState | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [monthlyBillRange, setMonthlyBillRange] = useState("")
  const state = clientState ?? serverState
  const isBusy = isValidating || isPending

  useEffect(() => {
    if (state.status !== "error") {
      return
    }

    const firstInvalidField = visibleFieldOrder.find(
      (field) => state.fieldErrors[field]?.length,
    )

    if (firstInvalidField) {
      const selector =
        firstInvalidField === "monthlyBillRange"
          ? "#monthlyBillRange"
          : `[name="${firstInvalidField}"]`

      formRef.current?.querySelector<HTMLElement>(selector)?.focus()
    }
  }, [state])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsValidating(true)

    let validationModule: typeof import("@/features/lead-form/validation")

    try {
      validationModule = await import("@/features/lead-form/validation")
    } catch {
      setIsValidating(false)
      startTransition(() => formAction(formData))
      return
    }

    const { toVisibleFieldErrors, validateLeadForm } = validationModule
    const result = validateLeadForm(formData)

    if (result.success) {
      setClientState(null)
      setIsValidating(false)
      startTransition(() => formAction(formData))
      return
    }

    const flattened = result.error.flatten()
    const fieldErrors = toVisibleFieldErrors(flattened.fieldErrors)

    setClientState({
      status: "error",
      message: flattened.fieldErrors.website?.length
        ? "Não foi possível enviar agora. Revise os campos e tente novamente."
        : "Revise os campos indicados antes de continuar.",
      fieldErrors,
    })
    setIsValidating(false)
  }

  function fieldError(field: (typeof visibleFieldOrder)[number]) {
    return state.fieldErrors[field]?.[0]
  }

  function selectMonthlyBillRange(value: string) {
    setMonthlyBillRange(value)
    billRangeDetailsRef.current?.removeAttribute("open")
    billRangeTriggerRef.current?.focus()
  }

  const selectedBillRangeLabel = monthlyBillOptions.find(
    (option) => option.value === monthlyBillRange,
  )?.label

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isBusy}
      className="relative"
    >
      <div
        className="pointer-events-none absolute left-[-10000px] size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <LeadTextField
            id="name"
            name="name"
            label="Seu nome"
            placeholder="Como podemos chamar você?"
            autoComplete="name"
            maxLength={80}
            required
            error={fieldError("name")}
          />
          <LeadTextField
            id="company"
            name="company"
            label="Empresa"
            placeholder="Nome do seu negócio"
            autoComplete="organization"
            maxLength={100}
            required
            error={fieldError("company")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <LeadTextField
            id="email"
            name="email"
            type="email"
            inputMode="email"
            label="E-mail profissional"
            placeholder="voce@empresa.com.br"
            autoComplete="email"
            maxLength={254}
            required
            error={fieldError("email")}
          />
          <LeadTextField
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            label="Telefone"
            optional
            placeholder="(11) 99999-9999"
            autoComplete="tel"
            maxLength={20}
            error={fieldError("phone")}
          />
        </div>

        <fieldset
          data-invalid={Boolean(fieldError("monthlyBillRange"))}
          className="gap-2"
        >
          <legend
            id="monthlyBillRange-label"
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            Faixa da conta mensal
            <RequiredMark />
          </legend>
          <details
            ref={billRangeDetailsRef}
            className="group/bill-select relative"
          >
            <summary
              ref={billRangeTriggerRef}
              id="monthlyBillRange"
              aria-labelledby="monthlyBillRange-label monthlyBillRange-value"
              aria-describedby={
                fieldError("monthlyBillRange")
                  ? "monthlyBillRange-hint monthlyBillRange-error"
                  : "monthlyBillRange-hint"
              }
              className={`flex h-12 w-full cursor-pointer list-none items-center justify-between rounded-lg border bg-canvas px-3.5 text-base text-ink outline-none transition-colors hover:border-forest/65 focus-visible:border-forest focus-visible:ring-3 focus-visible:ring-forest/20 [&::-webkit-details-marker]:hidden ${
                fieldError("monthlyBillRange")
                  ? "border-destructive ring-3 ring-destructive/15"
                  : "border-ink/24"
              }`}
            >
              <span
                id="monthlyBillRange-value"
                className={selectedBillRangeLabel ? undefined : "text-ink/68"}
              >
                {selectedBillRangeLabel ?? "Selecione uma faixa"}
              </span>
              <span
                aria-hidden
                className="size-2.5 rotate-45 border-r border-b border-current transition-transform group-open/bill-select:-rotate-135"
              />
            </summary>
            <div className="motion-dropdown-panel absolute top-[calc(100%+0.375rem)] left-0 z-30 w-full rounded-xl border border-ink/15 bg-paper p-1.5 text-ink shadow-(--shadow-card)">
              {monthlyBillOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-solar/40 has-focus-visible:ring-3 has-focus-visible:ring-forest/25 has-checked:bg-solar has-checked:font-semibold"
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="monthlyBillRange"
                    value={option.value}
                    required
                    checked={monthlyBillRange === option.value}
                    onChange={() => selectMonthlyBillRange(option.value)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className="opacity-0 peer-checked:opacity-100"
                  >
                    ✓
                  </span>
                </label>
              ))}
            </div>
          </details>
          <p
            id="monthlyBillRange-hint"
            className="mt-2 text-sm leading-normal text-muted-foreground"
          >
            Use a média dos últimos meses.
          </p>
          {fieldError("monthlyBillRange") ? (
            <p
              id="monthlyBillRange-error"
              className="mt-2 text-sm text-destructive"
            >
              {fieldError("monthlyBillRange")}
            </p>
          ) : null}
        </fieldset>
      </div>

      {state.message ? (
        <div
          className={`motion-feedback mt-6 rounded-lg border px-4 py-3 text-sm leading-relaxed ${
            state.status === "success"
              ? "border-forest/25 bg-forest/8 text-forest-deep"
              : "border-destructive/25 bg-destructive/6 text-destructive"
          }`}
          role={state.status === "error" ? "alert" : "status"}
          aria-live={state.status === "error" ? "assertive" : "polite"}
          aria-atomic="true"
        >
          <span className="flex items-start gap-2.5">
            {state.status === "success" ? (
              <span
                aria-hidden
                className="grid size-5 shrink-0 place-items-center rounded-full border border-current text-xs"
              >
                ✓
              </span>
            ) : null}
            {state.message}
          </span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isBusy}
        aria-disabled={isBusy}
        className="motion-interactive mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-forest-deep px-6 text-base font-semibold text-canvas shadow-(--shadow-button) hover:bg-forest focus-visible:ring-3 focus-visible:ring-forest/35 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {isBusy ? "Enviando solicitação…" : "Solicitar avaliação técnica"}
        <span aria-hidden>↗</span>
      </button>

      <p className="mt-4 max-w-[54ch] text-xs leading-relaxed text-ink/70">
        Ao enviar, você concorda com o contato da equipe técnica. Nesta
        demonstração, os dados são validados e descartados após o envio.
      </p>
    </form>
  )
}

type LeadTextFieldProps = React.ComponentProps<typeof Input> & {
  id: string
  label: string
  optional?: boolean
  error?: string
}

function LeadTextField({
  id,
  label,
  optional,
  error,
  ...inputProps
}: LeadTextFieldProps) {
  return (
    <div className="flex w-full flex-col gap-2" data-invalid={Boolean(error)}>
      <Label htmlFor={id} className="flex w-fit gap-2 leading-snug">
        {label}
        {optional ? (
          <span className="font-normal text-ink/65">(opcional)</span>
        ) : (
          <RequiredMark />
        )}
      </Label>
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 border-ink/24 bg-canvas px-3.5 text-base text-ink placeholder:text-ink/38 focus-visible:border-forest focus-visible:ring-forest/20"
        {...inputProps}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function RequiredMark() {
  return (
    <span className="text-forest" aria-hidden="true">
      *
    </span>
  )
}
