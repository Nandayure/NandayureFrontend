import { z } from 'zod';

export const StudiesCategorySchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  description: z.string().min(1, 'El campo es requerido'),
  weight: z.string().min(1, 'El campo es requerido'),
  Dedication: z.string().min(1, 'El campo es requerido'),
  Restriction: z.string().min(1, 'El campo es requerido'),
});

export const UpdateStudiesCategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  weight: z.string(),
  Dedication: z.string(),
  Restriction: z.string(),
});
