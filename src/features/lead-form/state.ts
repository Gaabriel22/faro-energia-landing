import type { LeadFormVisibleField } from "@/features/lead-form/schema"

export type LeadFormFieldErrors = Partial<
  Record<LeadFormVisibleField, readonly string[]>
>

export type LeadFormState = {
  status: "idle" | "error" | "success"
  message: string
  fieldErrors: LeadFormFieldErrors
}

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}
