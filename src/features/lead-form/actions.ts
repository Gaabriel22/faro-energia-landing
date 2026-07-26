"use server"

import {
  leadFormSchema,
  type LeadFormField,
  type LeadFormVisibleField,
} from "@/features/lead-form/schema"
import type {
  LeadFormFieldErrors,
  LeadFormState,
} from "@/features/lead-form/state"

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

function readExpectedFields(formData: FormData) {
  return {
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    monthlyBillRange: formData.get("monthlyBillRange") ?? "",
    website: formData.get("website") ?? "",
  }
}

function toVisibleFieldErrors(
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

export async function submitLead(
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (hasUnexpectedEntries(formData)) {
    return genericErrorState
  }

  const result = leadFormSchema.safeParse(readExpectedFields(formData))

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
