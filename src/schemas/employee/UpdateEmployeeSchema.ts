import { z } from "zod";

export const UpdateEmployeeSchema = z.object({
  Name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 letras')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El nombre solo debe contener letras')
    .optional(),

  Surname1: z
    .string()
    .min(2, 'El primer apellido debe tener al menos 2 letras')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El primer apellido solo debe contener letras')
    .optional(),

  Surname2: z
    .string()
    .min(2, 'El segundo apellido debe tener al menos 2 letras')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El segundo apellido solo debe contener letras')
    .optional(),

  Birthdate: z
    .union([
      z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'La fecha de nacimiento debe ser una fecha válida',
      }),
      z.instanceof(Date)
    ])
    .optional(),

  HiringDate: z
    .union([
      z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'La fecha de contratación debe ser una fecha válida',
      }),
      z.instanceof(Date)
    ])
    .optional(),

  Email: z
    .string()
    .email('El correo electrónico no es válido')
    .optional(),

  CellPhone: z
    .string()
    .min(8, 'El número de teléfono debe tener 8 dígitos')
    .max(8, 'El número de teléfono debe tener 8 dígitos')
    .regex(/^\d{8}$/, 'El número de teléfono solo debe contener 8 dígitos numéricos')
    .optional(),

  NumberChlidren: z
    .number()
    .min(0, 'El número de hijos no puede ser negativo')
    .int('El número de hijos debe ser un número entero')
    .optional(),

  AvailableVacationDays: z
    .number()
    .min(0, 'Los días de vacaciones disponibles no pueden ser negativos')
    .int('Los días de vacaciones deben ser un número entero')
    .optional(),

  MaritalStatusId: z
    .number()
    .int('El estado civil debe ser un número entero')
    .optional(),

  GenderId: z
    .number()
    .int('El género debe ser un número entero')
    .optional(),
});