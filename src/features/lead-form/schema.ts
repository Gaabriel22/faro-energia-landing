import { z } from "zod"

export const MONTHLY_BILL_RANGES = [
  "300-999",
  "1000-2999",
  "3000-9999",
  "10000-29999",
  "30000+",
] as const

const phoneSchema = z
  .string()
  .trim()
  .max(20, "Use no máximo 20 caracteres.")
  .refine(
    (value) => value === "" || /^[\d\s()+.-]+$/.test(value),
    "Use somente números e pontuação de telefone.",
  )
  .transform((value) => value.replace(/\D/g, ""))
  .refine(
    (value) => value === "" || value.length === 10 || value.length === 11,
    "Informe um telefone com DDD e 10 ou 11 dígitos.",
  )
  .transform((value) => value || undefined)
  .optional()

export const leadFormSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome com pelo menos 2 caracteres.")
    .max(80, "Use no máximo 80 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Informe um e-mail válido.")
    .max(254, "Use no máximo 254 caracteres.")
    .email("Informe um e-mail válido."),
  phone: phoneSchema,
  company: z
    .string()
    .trim()
    .min(2, "Informe a empresa com pelo menos 2 caracteres.")
    .max(100, "Use no máximo 100 caracteres."),
  monthlyBillRange: z.enum(MONTHLY_BILL_RANGES, {
    error: "Selecione uma faixa de conta mensal.",
  }),
  website: z
    .string()
    .max(0, "Não foi possível enviar a solicitação. Tente novamente."),
})

export type LeadFormInput = z.input<typeof leadFormSchema>
export type LeadFormData = z.output<typeof leadFormSchema>
export type LeadFormField = keyof LeadFormInput
export type LeadFormVisibleField = Exclude<LeadFormField, "website">
