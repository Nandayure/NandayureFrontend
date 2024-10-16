import { z } from 'zod';

export const DepartmentProgramSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export const UpdateDepartmentProgramSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});
