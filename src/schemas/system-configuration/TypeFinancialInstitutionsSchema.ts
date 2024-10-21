import { z } from 'zod';

export const TypeFinancialInstitutionsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const UpdateTypeFinancialInstitutionsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});
