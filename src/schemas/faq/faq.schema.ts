import * as z from 'zod';

export const CreateFaqSchema = z.object({
  question: z.string()
    .min(1, 'La pregunta es requerida')
    .max(500, 'La pregunta no puede tener más de 500 caracteres'),
  answer: z.string()
    .min(1, 'La respuesta es requerida')
    .max(2000, 'La respuesta no puede tener más de 2000 caracteres'),
  faqCategoryId: z.number({
    required_error: 'La categoría es requerida',
    invalid_type_error: 'La categoría debe ser un número',
  }),
});

export const UpdateFaqSchema = CreateFaqSchema;

export type FaqFormData = z.infer<typeof CreateFaqSchema>;
export type UpdateFaqFormData = z.infer<typeof UpdateFaqSchema>;