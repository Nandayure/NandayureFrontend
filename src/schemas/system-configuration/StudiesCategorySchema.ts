import { z } from 'zod';

export const StudiesCategorySchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  description: z.string().min(1, 'El campo es requerido'),
  weight: z.string().min(1, 'El campo es requerido'),
  Dedication: z.string().min(1, 'El campo es requerido'),
  Restriction: z.string().min(1, 'El campo es requerido'),
});

export const UpdateStudiesCategorySchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  description: z.string().min(1, 'El campo es requerido'),
  weight: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'El peso debe ser un número.',
  }),
  Dedication: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'La dedicación debe ser un número.',
  }),
  Restriction: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'La restricción debe ser un número.',
  }),
});
