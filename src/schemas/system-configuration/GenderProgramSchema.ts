import { z } from 'zod';

export const GenderProgramSchema = z.object({
  name: z.string().min(1, 'El género es requerido'),
});

export const UpdateGenderProgramSchema = z.object({
  name: z.string().min(1, 'El género es requerido'),
});
