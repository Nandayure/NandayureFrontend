import { z } from 'zod';

export const JobPositionSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
  baseSalary: z.string().min(1, 'El salario base es requerido'),
  globalSalary: z.string().min(1, 'El salario global es requerido'),
  extrafees: z.string().min(1, 'El salario extra es requerido'),
  DepartmentId: z.number({
    invalid_type_error: 'El ID del departamento debe ser un número.',
  }),
});

export const UpdateJobPositionSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido'),
  Description: z.string().min(1, 'La descripción es requerida'),
  baseSalary: z.string().min(1, 'El salario base es requerido'),
  globalSalary: z.string().min(1, 'El salario global es requerido'),
  extrafees: z.string().min(1, 'El salario extra es requerido'),
  DepartmentId: z.number({
    invalid_type_error: 'El ID del departamento debe ser un número.',
  }),
});
