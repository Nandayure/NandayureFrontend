import * as z from 'zod';

export const CreateHolidaySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  date: z.string().refine(
    (date) => {
      // Validate date format (YYYY-MM-DD)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    },
    { message: "Formato de fecha inválido. Use YYYY-MM-DD" }
  ),
  isActive: z.boolean().optional().default(true),
  isRecurringYearly: z.boolean().optional().default(false),
});

// Tipo para los datos del formulario
export type HolidayFormData = z.infer<typeof CreateHolidaySchema>;

export const UpdateHolidaySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).optional(),
  date: z.string().refine(
    (date) => {
      // Validate date format (YYYY-MM-DD)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    },
    { message: "Formato de fecha inválido. Use YYYY-MM-DD" }
  ).optional(),
  isActive: z.boolean().optional(),
  isRecurringYearly: z.boolean().optional(),
});

// Tipo para los datos del formulario de actualización
export type UpdateHolidayFormData = z.infer<typeof UpdateHolidaySchema>;