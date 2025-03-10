import { z } from 'zod';

// No se requieren validaciones de opciones específicas para género y estado civil

export const PersonalInfoSchema = z.object({
  // Validación de cédula costarricense
  id: z
    .string({
      required_error: 'La cédula es obligatoria',
      invalid_type_error: 'La cédula debe ser un texto',
    })
    .min(1, { message: 'La cédula no puede estar vacía' })
    .refine((cedula) => /^\d{9}$/.test(cedula), {
      message: 'La cédula debe contener exactamente 9 dígitos',
    })
    .refine((cedula) => /^[1-7]\d{8}$/.test(cedula), {
      message: 'La cédula debe comenzar con un número del 1 al 7 (provincia)',
    }),

  // Validación del nombre
  Name: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser un texto',
    })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    .refine((name) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(name), {
      message: 'El nombre solo puede contener letras y espacios',
    })
    .transform((name) => name.trim()),

  // Validación del primer apellido
  Surname1: z
    .string({
      required_error: 'El primer apellido es obligatorio',
      invalid_type_error: 'El primer apellido debe ser un texto',
    })
    .min(2, { message: 'El primer apellido debe tener al menos 2 caracteres' })
    .max(50, {
      message: 'El primer apellido no puede exceder los 50 caracteres',
    })
    .refine((surname) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(surname), {
      message: 'El primer apellido solo puede contener letras y espacios',
    })
    .transform((surname) => surname.trim()),

  // Validación del segundo apellido
  Surname2: z
    .string({
      required_error: 'El segundo apellido es obligatorio',
      invalid_type_error: 'El segundo apellido debe ser un texto',
    })
    .min(2, { message: 'El segundo apellido debe tener al menos 2 caracteres' })
    .max(50, {
      message: 'El segundo apellido no puede exceder los 50 caracteres',
    })
    .refine((surname) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(surname), {
      message: 'El segundo apellido solo puede contener letras y espacios',
    })
    .transform((surname) => surname.trim()),

  // Validación de la fecha de nacimiento
  Birthdate: z
    .string({
      required_error: 'La fecha de nacimiento es obligatoria',
      invalid_type_error: 'La fecha de nacimiento debe ser una fecha válida',
    })
    .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: 'El formato de la fecha de nacimiento no es válido',
    })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        return date < now;
      },
      { message: 'La fecha de nacimiento no puede ser en el futuro' },
    )
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        const monthDiff = now.getMonth() - date.getMonth();
        const dayDiff = now.getDate() - date.getDate();
        const adjustedAge =
          monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
        return adjustedAge >= 18 && adjustedAge <= 120;
      },
      { message: 'La edad debe estar entre 18 y 120 años' },
    )
    .transform((dateStr) => new Date(dateStr).toISOString()),

  // Validación del género
  GenderId: z
    .number({
      required_error: 'El género es obligatorio',
      invalid_type_error: 'El género debe ser un número',
    })
    .int({ message: 'El identificador de género debe ser un número entero' }),

  // Validación del estado civil
  MaritalStatusId: z
    .number({
      required_error: 'El estado civil es obligatorio',
      invalid_type_error: 'El estado civil debe ser un número',
    })
    .int({
      message: 'El identificador de estado civil debe ser un número entero',
    }),
});
