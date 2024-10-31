import { z } from 'zod';

const today = new Date().toISOString().split('T')[0];

export const AnnuitySchema = z.object({
  Date: z
    .string()
    .min(1, 'La fecha es obligatoria')
    .refine((val) => val >= today, {
      message: 'La fecha no puede ser anterior a la actual.',
    }),
  Description: z.string().min(1, 'La descripción es obligatoria'),
  Amount: z
    .number()
    .positive('El monto debe ser mayor que cero.'),
  EmployeeId: z
    .string()
    .min(1, 'El ID del empleado es obligatorio')
    .refine((val) => /^[0-9]+$/.test(val), {
      message: 'El ID del empleado debe ser numérico.',
    }),
});

export const UpdateAnnuitySchema = z.object({
  Date: z
    .string()
    .min(1, 'La fecha es obligatoria')
    .refine((val) => val >= today, {
      message: 'La fecha no puede ser anterior a la actual.',
    }),
  Description: z.string().min(1, 'La descripción es obligatoria').optional(),
  Amount: z
    .number()
    .positive('El monto debe ser mayor que cero.')
    .optional(),
  EmployeeId: z
    .string()
    .min(1, 'El ID del empleado es obligatorio')
    .refine((val) => /^[0-9]+$/.test(val), {
      message: 'El ID del empleado debe ser numérico.',
    })
    .optional(),
});
