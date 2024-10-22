import { z } from 'zod';

export const GenderSchema = z.object({
  gender: z.string().min(1, { message: 'El género es requerido' }), // Mensaje personalizado para campos vacíos
  genderProgramId: z
    .number({
      invalid_type_error:
        'El ID del género debe ser un número.',
    })
});

export const UpdateGenderSchema = z.object({
  gender: z.string().min(1, 'El género es requerido'),
  genderProgramId: z
    .number({
      invalid_type_error:
        'El ID del género debe ser un número.',
    })
});
