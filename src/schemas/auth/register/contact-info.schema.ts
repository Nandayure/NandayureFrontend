import { z } from 'zod';

export const ContactInfoSchema = z.object({
  // Validación del correo electrónico
  Email: z
    .string({
      required_error: 'El correo electrónico es obligatorio',
      invalid_type_error: 'El correo electrónico debe ser un texto',
    })
    .min(1, { message: 'El correo electrónico no puede estar vacío' })
    .email({ message: 'El formato del correo electrónico no es válido' })
    .toLowerCase()
    .trim(),

  // Validación del número de teléfono celular (formato Costa Rica)
  CellPhone: z
    .string({
      required_error: 'El número de teléfono es obligatorio',
      invalid_type_error: 'El número de teléfono debe ser un texto',
    })
    .min(1, { message: 'El número de teléfono no puede estar vacío' })
    .refine((phone) => /^\d{8}$/.test(phone), {
      message: 'El número de teléfono debe contener exactamente 8 dígitos',
    })
});
