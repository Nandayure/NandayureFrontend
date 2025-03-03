import * as z from 'zod';

export const CreateFaqCategorySchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),
});

export const UpdateFaqCategorySchema = CreateFaqCategorySchema;

export type FaqCategoryFormData = z.infer<typeof CreateFaqCategorySchema>;
export type UpdateFaqCategoryFormData = z.infer<typeof UpdateFaqCategorySchema>;