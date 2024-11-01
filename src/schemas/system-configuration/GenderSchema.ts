
import { z } from 'zod';

export const GenderSchema = z.object({
  Name: z.string().min(1, { message: 'El género es requerido' }), // Mensaje personalizado para campos vacíos
});

export const UpdateGenderSchema = z.object({
  Name: z.string().min(1, 'El género es requerido'),
});