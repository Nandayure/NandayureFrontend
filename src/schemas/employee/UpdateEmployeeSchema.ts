import { z } from "zod";

export const UpdateEmployeeSchema = z.object({
  Name: z
  .string()
  .min(2, 'El nombre debe tener al menos 2 letras')
  .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El nombre solo debe contener letras')
  .optional(),

  Surname1: z.string().min(2, 'El primer apellido debe tener al menos 2 letras')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El primer apellido solo debe contener letras')
    .optional(),

  Surname2: z.string().min(2, 'El segundo apellido debe tener al menos 2 letras')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'El segundo apellido solo debe contener letras')
    .optional(),

  Birthdate: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      const currentYear = new Date().getFullYear();
      return !isNaN(date.getTime()) && date.getFullYear() < currentYear;
    }, {
      message: 'La fecha de nacimiento no puede ser del año actual',
    })
    .optional(),

  Email: z.string().email('El correo electrónico no es válido').optional(),
  CellPhone: z
    .string()
    .min(8, 'El número de teléfono debe tener 8 dígitos')
    .max(8, 'El número de teléfono debe tener 8 dígitos')
    .regex(/^\d{8}$/, 'El número de teléfono solo debe contener 8 dígitos numéricos')
    .optional(),
});