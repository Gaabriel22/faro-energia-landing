"use client"

import { useState, type FormEvent } from "react"
import { ArrowDownRight, ArrowUpRight, Calculator } from "lucide-react"

import {
  calculateSavings,
  MAXIMUM_MONTHLY_BILL,
  MINIMUM_MONTHLY_BILL,
  parseBrazilianCurrency,
  type SavingsEstimate,
} from "@/features/savings-estimator/calculate-savings"
import { formatCurrency } from "@/lib/format"

const INITIAL_INPUT = "2.500"
const INITIAL_ESTIMATE = calculateSavings(2_500)

type SavingsEstimatorProps = {
  disclaimer: string
}

function validateInput(value: string) {
  const monthlyBill = parseBrazilianCurrency(value)

  if (monthlyBill === null) {
    return {
      error: "Digite um valor em reais, como 1.000.",
      monthlyBill: null,
    }
  }

  if (monthlyBill < MINIMUM_MONTHLY_BILL) {
    return {
      error: "Informe uma conta mensal a partir de R$ 300.",
      monthlyBill: null,
    }
  }

  if (monthlyBill > MAXIMUM_MONTHLY_BILL) {
    return {
      error: "Informe uma conta mensal de até R$ 100.000.",
      monthlyBill: null,
    }
  }

  return { error: null, monthlyBill }
}

export function SavingsEstimator({ disclaimer }: SavingsEstimatorProps) {
  const [inputValue, setInputValue] = useState(INITIAL_INPUT)
  const [estimate, setEstimate] = useState<SavingsEstimate>(INITIAL_ESTIMATE)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validation = validateInput(inputValue)

    if (validation.error || validation.monthlyBill === null) {
      setError(validation.error)
      return
    }

    setEstimate(calculateSavings(validation.monthlyBill))
    setError(null)
  }

  return (
    <div className="overflow-hidden border border-forest-deep/22 bg-solar text-forest-deep shadow-(--shadow-soft)">
      <div className="flex items-center justify-between gap-5 border-b border-forest-deep/22 px-5 py-4 sm:px-7">
        <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] uppercase">
          <Calculator aria-hidden className="size-4" />
          Simulador Faro
        </p>
        <p className="text-xs font-semibold text-forest-deep/78">
          Base de cálculo: 80%
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="grid gap-6 px-5 py-7 sm:px-7 sm:py-9"
      >
        <div>
          <label htmlFor="monthly-bill" className="block text-sm font-bold">
            Qual é a média mensal da sua conta?
          </label>
          <div className="relative mt-3">
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 font-heading text-2xl"
            >
              R$
            </span>
            <input
              id="monthly-bill"
              name="monthlyBill"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              required
              maxLength={14}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={
                error
                  ? "monthly-bill-hint monthly-bill-error"
                  : "monthly-bill-hint"
              }
              className="min-h-18 w-full rounded-none border border-forest-deep/35 bg-paper py-3 pr-5 pl-16 font-heading text-[clamp(2rem,7vw,3.5rem)] leading-none tracking-[-0.04em] text-forest-deep shadow-inner placeholder:text-forest-deep/35 focus-visible:border-forest-deep aria-invalid:border-destructive"
            />
          </div>
          <p
            id="monthly-bill-hint"
            className="mt-2 text-xs leading-relaxed text-forest-deep/66"
          >
            Use um valor entre R$ 300 e R$ 100.000.
          </p>
          {error ? (
            <p
              id="monthly-bill-error"
              role="alert"
              className="mt-3 border-l-2 border-destructive pl-3 text-sm font-semibold text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="motion-interactive inline-flex min-h-12 w-full items-center justify-between rounded-full bg-forest-deep px-6 text-sm font-bold text-canvas shadow-(--shadow-button) hover:bg-forest"
        >
          Calcular economia
          <ArrowDownRight aria-hidden className="size-4" />
        </button>
      </form>

      <div className="bg-forest-deep p-5 text-canvas sm:p-7">
        <div
          key={estimate.monthlySavings}
          role="status"
          aria-label="Resultado da estimativa"
          aria-atomic="true"
          className="motion-feedback grid gap-px overflow-hidden border border-canvas/18 bg-canvas/18 sm:grid-cols-2"
        >
          <div className="bg-forest-deep p-5">
            <p className="text-[0.65rem] font-bold tracking-[0.14em] text-solar uppercase">
              Economia estimada por mês
            </p>
            <p className="mt-3 font-heading text-[clamp(2.6rem,7vw,4.75rem)] leading-none tracking-tighter">
              {formatCurrency(estimate.monthlySavings)}
            </p>
          </div>
          <div className="bg-forest-deep p-5">
            <p className="text-[0.65rem] font-bold tracking-[0.14em] text-solar uppercase">
              Economia estimada por ano
            </p>
            <p className="mt-3 font-heading text-[clamp(2.6rem,7vw,4.75rem)] leading-none tracking-tighter">
              {formatCurrency(estimate.annualSavings)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-canvas/18 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[48ch] text-xs leading-relaxed text-canvas/62">
            {disclaimer}
          </p>
          <a
            href="#orcamento"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm text-sm font-bold text-solar underline decoration-solar/40 underline-offset-5 hover:decoration-solar"
          >
            Solicitar avaliação técnica
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
