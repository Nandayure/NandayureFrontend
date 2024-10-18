import { z } from 'zod';
export const StudySchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  description: z.string().min(1, 'El campo es requerido'),
  weight: z.number().min(1, 'El campo es requerido'),
  Dedication: z.number().min(1, 'El campo es requerido'),
  Restriction: z.number().min(1, 'El campo es requerido'),
});

export const UpdateStudySchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  description: z.string().min(1, 'El campo es requerido'),
  weight: z.number().min(1, 'El campo es requerido'),
  Dedication: z.number().min(1, 'El campo es requerido'),
  Restriction: z.number().min(1, 'El campo es requerido'),
});
