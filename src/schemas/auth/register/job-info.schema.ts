import { z } from 'zod';

export const JobInfoSchema = z.object({
  // Validación de la fecha de contratación
  HiringDate: z
    .string({
      required_error: 'La fecha de contratación es obligatoria',
      invalid_type_error: 'La fecha de contratación debe ser una fecha válida',
    })
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: 'El formato de la fecha de contratación no es válido',
    })
    .refine(
      (dateStr) => {
        const hiringDate = new Date(dateStr);
        const now = new Date();

        // La fecha de contratación no puede ser en el futuro
        return hiringDate <= now;
      },
      { message: 'La fecha de contratación no puede ser en el futuro' },
    )
    .refine(
      (dateStr) => {
        const hiringDate = new Date(dateStr);
        const now = new Date();
        const yearsAgo = new Date();
        yearsAgo.setFullYear(now.getFullYear() - 100); // Límite de 100 años atrás

        // La fecha de contratación no puede ser demasiado antigua
        return hiringDate >= yearsAgo;
      },
      { message: 'La fecha de contratación no puede ser mayor a 100 años' },
    )
    .transform((dateStr) => new Date(dateStr).toISOString()),

  // Validación del número de hijos
  NumberChlidren: z
    .number({
      required_error: 'El número de hijos es obligatorio',
      invalid_type_error: 'El número de hijos debe ser un número',
    })
    .int({ message: 'El número de hijos debe ser un número entero' })
    .min(0, { message: 'El número de hijos no puede ser negativo' })
    .max(30, { message: 'El número de hijos no puede exceder 30' }),

  // Validación del puesto de trabajo
  JobPositionId: z
    .number({
      required_error: 'El puesto de trabajo es obligatorio',
      invalid_type_error: 'El ID del puesto de trabajo debe ser un número',
    })
    .int({ message: 'El ID del puesto de trabajo debe ser un número entero' })
    .min(1, {
      message: 'El ID del puesto de trabajo debe ser un número positivo',
    }),

  // Validación de días de vacaciones disponibles
  AvailableVacationDays: z
    .number({
      required_error: 'Los días de vacaciones disponibles son obligatorios',
      invalid_type_error:
        'Los días de vacaciones disponibles deben ser un número',
    })
    .int({
      message: 'Los días de vacaciones disponibles deben ser un número entero',
    })
    .min(0, {
      message: 'Los días de vacaciones disponibles no pueden ser negativos',
    })
    .max(365, {
      message: 'Los días de vacaciones disponibles no pueden exceder 365',
    }),
});
