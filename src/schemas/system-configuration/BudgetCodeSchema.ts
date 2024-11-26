import { z } from 'zod';

export const BudgetCodeSchema = z.object({
  CodSalary: z.string().nonempty('El campo es requerido'),
  CodExtra: z.string().nonempty('El campo es requerido'),
  CodAnuity: z.string().nonempty('El campo es requerido'),
  CodSalaryPlus: z.string().nonempty('El campo es requerido'),
});

export const UpdateBudgetCodeSchema = z.object({
  CodSalary: z.string().nonempty('El campo es requerido'),
  CodExtra: z.string().nonempty('El campo es requerido'),
  CodAnuity: z.string().nonempty('El campo es requerido'),
  CodSalaryPlus: z.string().nonempty('El campo es requerido'),
});
