import { z } from "zod";

export const UpdateEmployeeSchema = z.object({
  Name: z.string().min(1, 'El nombre es requerido').optional(),
  Surname1: z.string().min(1, 'El primer apellido es requerido').optional(),
  Surname2: z.string().min(1, 'El segundo apellido es requerido').optional(),
  Birthdate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'La fecha de nacimiento no es válida.',
    })
    .optional(),
  Email: z.string().email('El correo electrónico no es válido').optional(),
  CellPhone: z.string().min(1, 'El número de teléfono es requerido').optional(),
});