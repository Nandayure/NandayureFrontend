export interface Department {
  id: number;
  name: string;
  description: string;
  departmentProgramId: number;
  departmentHeadId: string;
}

export interface PatchDepartment {
  id?: number;
  name?: string;
  description?: string;
  departmentProgramId?: number;
  budgetCodeId?: number;
  departmentHeadId?: string;
} 