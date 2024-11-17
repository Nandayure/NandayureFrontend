import { z } from "zod";

export const RegisterSchema = z.object({
  id: z
    .string()
    .min(1, 'El número de identificación es requerido')
    .refine((val) => !isNaN(Number(val)), {
      message:
        'El número de identificación no debe incluir caracteres especiales.',
    }),
  Name: z.string().min(1, 'El nombre es requerido'),
  Surname1: z.string().min(1, 'El primer apellido es requerido'),
  Surname2: z.string().min(1, 'El segundo apellido es requerido'),
  Birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'La fecha de nacimiento no es válida.',
  }),
  HiringDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'La fecha de contratación no es válida.',
  }),
  Email: z.string().email('El correo electrónico no es válido'),
  CellPhone: z.string().min(1, 'El número de teléfono es requerido'),
  NumberChlidren: z
    .string()
    .min(1, 'El número de hijos es requerido')
    .refine((val) => !isNaN(Number(val)), {
      message: 'El número de hijos debe ser un número.',
    }),
  AvailableVacationDays: z
    .string()
    .min(1, 'Los días de vacaciones disponibles son requeridos')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Los días de vacaciones disponibles deben ser un número.',
    }),
  MaritalStatusId: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'El estado civil debe ser un número.',
  }),
  GenderId: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'El género debe ser un número.',
  }),
  JobPositionId: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'La posición laboral debe ser un número.',
  }),
});