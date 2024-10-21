import { z } from 'zod';

export const FinancialInstitutionsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  deductionPercentage: z
    .string()
    .min(1, 'El porcentaje de deducción es requerido'),
  TypeFinancialInstitutionId: z.number({
    invalid_type_error:
      'El ID del tipo de institución financiera debe ser un número.',
  }),
});

export const UpdateFinancialInstitutionsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  deductionPercentage: z
    .string()
    .min(1, 'El porcentaje de deducción es requerido'),
    TypeFinancialInstitutionId: z.number({
    invalid_type_error:
      'El ID del tipo de institución financiera debe ser un número.',
  }),
});
