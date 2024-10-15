import { z } from 'zod';

export const DepartmentProgramSchema = z.object({});

export const UpdateDepartmentProgramSchema = z.object({
  id: z.number(),
  name: z.string(),
});
