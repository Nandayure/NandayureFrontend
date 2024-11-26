export interface JobPosition {
  id: number;
  Name: string;
  Description: string;
  baseSalary: number;
  globalSalary: number;
  extrafees:  number;
  DepartmentId: number;
}

export interface PatchJobPosition {
  Name?: string;
  Description?: string;
  baseSalary?: number;
  globalSalary?: number;
  extrafees?: number;
  DepartmentId?: number;
}