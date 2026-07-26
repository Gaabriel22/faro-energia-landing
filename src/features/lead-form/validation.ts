import {
  leadFormSchema,
  type LeadFormVisibleField,
} from "@/features/lead-form/schema"
import type { LeadFormFieldErrors } from "@/features/lead-form/state"

export function readLeadFormFields(formData: FormData) {
  return {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    monthlyBillRange: formData.get("monthlyBillRange") ?? "",
    website: formData.get("website") ?? "",
  }
}

export function toVisibleFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): LeadFormFieldErrors {
  const visibleFields: readonly LeadFormVisibleField[] = [
    "name",
    "email",
    "phone",
    "company",
    "monthlyBillRange",
  ]

  return Object.fromEntries(
    visibleFields.flatMap((field) =>
      fieldErrors[field]?.length ? [[field, fieldErrors[field]]] : [],
    ),
  ) as LeadFormFieldErrors
}

export function validateLeadForm(formData: FormData) {
  return leadFormSchema.safeParse(readLeadFormFields(formData))
}
