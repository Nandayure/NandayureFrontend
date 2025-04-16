import { Employee } from "@/types/Employee";

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

export interface UpdateDepartmentHead {
  departmentHeadId: number;
}

export interface DepartmentEmployees extends Employee {
}

