import { z } from 'zod';

export const StudySchema = z.object({
  id: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'El ID debe ser un número.',
  }),
  name: z.string().min(1, 'El nombre es requerido'),
  StudyCategoryId: z.string().min(1, 'El ID de la categoría de estudio es requerido'),
});

export const UpdateStudySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  StudyCategoryId: z.string().min(1, 'El ID de la categoría de estudio es requerido'),
});
