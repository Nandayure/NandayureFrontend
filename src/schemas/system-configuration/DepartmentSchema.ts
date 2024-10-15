import { z } from 'zod';

export const DepartmentSchema = z.object({});

export const UpdateDepartmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  departmentProgramId: z.number(),
  budgetCodeId: z.number(),
  departmentHeadId: z.string(),
});
