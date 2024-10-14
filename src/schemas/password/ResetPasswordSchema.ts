import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    Password: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(32, 'La contraseña no puede tener más de 32 caracteres')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'La contraseña debe contener al menos un carácter especial',
      )
      .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
      .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula'),
    ConfirmPassword: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida',
      })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(32, 'La contraseña no puede tener más de 32 caracteres'),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['ConfirmPassword'],
  });
