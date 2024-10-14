import { string, z } from "zod";

export const LoginSchema = z.object({
  EmployeeId: z
    .string()
    .min(1, 'El número de identificación es requerido')
    .refine((val) => !isNaN(Number(val)), {
      message:
        'El número de identificación no debe incluir caracteres especiales.',
    }),
  Password: string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(32, 'La contraseña no puede tener más de 32 caracteres'),
});