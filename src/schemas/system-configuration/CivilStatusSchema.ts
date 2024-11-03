import { z } from 'zod';

export const CivilStatusSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
});

export const UpdateCivilStatuSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
    });
