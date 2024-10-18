import { z } from 'zod';

export const StudiesCategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  weight: z.string(),
  Dedication: z.string(),
  Restriction: z.string(),
});

export const UpdateStudiesCategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  weight: z.string(),
  Dedication: z.string(),
  Restriction: z.string(),
});
