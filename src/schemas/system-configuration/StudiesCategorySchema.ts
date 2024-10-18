import { z } from 'zod';

export interface StudiesCategory {
  id: string;
  description: string;
  weight: number;
  Dedication: number;
  Restriction: number;
}

export const StudiesCategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  weight: z.number(),
  Dedication: z.number(),
  Restriction: z.number(),
});

export const UpdateStudiesCategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  weight: z.number(),
  Dedication: z.number(),
  Restriction: z.number(),
});
