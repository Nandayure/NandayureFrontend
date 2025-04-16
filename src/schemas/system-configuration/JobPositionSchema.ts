import { z } from 'zod';

export const JobPositionSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
  DepartmentId: z.number({
    invalid_type_error: 'El ID del departamento debe ser un número.',
  }),
});

export const UpdateJobPositionSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
  DepartmentId: z.number({
    invalid_type_error: 'El ID del departamento debe ser un número.',
  }),
});
