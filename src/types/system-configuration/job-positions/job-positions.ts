export interface JobPosition {
  id: number;
  Name: string;
  Description: string;
  DepartmentId: number;
}

export interface PatchJobPosition {
  Name?: string;
  Description?: string;
  DepartmentId?: number;
}