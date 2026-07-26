"use server"

import { type LeadFormField } from "@/features/lead-form/schema"
import type { LeadFormState } from "@/features/lead-form/state"
import {
  toVisibleFieldErrors,
  validateLeadForm,
} from "@/features/lead-form/validation"

const EXPECTED_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "monthlyBillRange",
  "website",
] as const satisfies readonly LeadFormField[]

const expectedFieldSet = new Set<string>(EXPECTED_FIELDS)

const genericErrorState: LeadFormState = {
  status: "error",
  message: "Não foi possível enviar agora. Revise os campos e tente novamente.",
  fieldErrors: {},
}

function hasUnexpectedEntries(formData: FormData) {
  for (const key of formData.keys()) {
    if (!expectedFieldSet.has(key) && !key.startsWith("$ACTION_")) {
      return true
    }
  }

  return EXPECTED_FIELDS.some((field) => formData.getAll(field).length > 1)
}

export async function submitLead(
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (hasUnexpectedEntries(formData)) {
    return genericErrorState
  }

  const result = validateLeadForm(formData)

  if (!result.success) {
    const flattened = result.error.flatten()

    if (flattened.fieldErrors.website?.length) {
      return genericErrorState
    }

    return {
      status: "error",
      message: "Revise os campos indicados antes de continuar.",
      fieldErrors: toVisibleFieldErrors(flattened.fieldErrors),
    }
  }

  return {
    status: "success",
    message:
      "Solicitação simulada com sucesso. Nenhum dado foi armazenado ou enviado.",
    fieldErrors: {},
  }
}
