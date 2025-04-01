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
  ).optional(),
  isActive: z.boolean().optional().default(true),
  isRecurringYearly: z.boolean().optional().default(false),
  recurringMonth: z.number().min(1).max(12).optional(),
  recurringDay: z.number().min(1).max(31).optional(),
}).refine((data) => {
  // Si isRecurringYearly es true, entonces recurringMonth y recurringDay son obligatorios
  if (data.isRecurringYearly) {
    return data.recurringMonth !== undefined && data.recurringDay !== undefined;
  }
  // Si isRecurringYearly es false, entonces date es obligatorio
  return data.date !== undefined;
}, {
  message: "Si es recurrente anual, se requiere mes y día. Si no es recurrente, se requiere fecha específica.",
  path: ["date"], // Muestra el error en el campo date por defecto
});

// Tipo para los datos del formulario
export type HolidayFormData = z.infer<typeof CreateHolidaySchema>;

export const UpdateHolidaySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).optional(),
  specificDate: z.string().refine(
    (date) => {
      if (!date) return true;
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date);
    },
    { message: "Formato de fecha inválido. Use YYYY-MM-DD" }
  ).optional(),
  date: z.string().optional(), // Para el formulario
  isActive: z.boolean().optional(),
  isRecurringYearly: z.boolean().optional(),
  recurringMonth: z.number().min(1).max(12).optional(),
  recurringDay: z.number().min(1).max(31).optional(),
});

// Tipo para los datos del formulario de actualización
export type UpdateHolidayFormData = z.infer<typeof UpdateHolidaySchema>;