import { string, z } from "zod";

export const EmailSendSchema = z.object({
  Email: string({ required_error: 'El correo electrónico es requerido' })
    .email('El correo electrónico no es válido')
    .max(255, 'El correo electrónico no puede tener más de 255 caracteres')
    .min(1, 'El correo electrónico es requerido'),
});