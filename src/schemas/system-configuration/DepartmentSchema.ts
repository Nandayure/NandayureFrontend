import { z } from 'zod';

export const DepartmentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  departmentProgramId: z
    .string()
    .min(1, 'El ID del programa departamental es requerido')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'El ID del programa departamental debe ser un número.',
    }),
  budgetCodeId: z
    .string()
    .min(1, 'El código presupuestario es requerido')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'El código presupuestario debe ser un número.',
    }),
  departmentHeadId: z
    .string()
    .min(1, 'El ID del jefe del departamento es requerido'),
});

export const UpdateDepartmentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  departmentProgramId: z
    .string()
    .min(1, 'El ID del programa departamental es requerido')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'El ID del programa departamental debe ser un número.',
    }),
  budgetCodeId: z
    .string()
    .min(1, 'El código presupuestario es requerido')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'El código presupuestario debe ser un número.',
    }),
  departmentHeadId: z
    .string()
    .min(1, 'El ID del jefe del departamento es requerido'),
});
