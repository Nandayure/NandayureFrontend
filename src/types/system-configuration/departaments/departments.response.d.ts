import { BaseFilterParams } from '@/types/common/base-filter';

export interface GetDepartmentsQueryParams extends BaseFilterParams { }

export interface DepartmentHead {
  Name: string;
  id: string;
  Surname1: string;
  Surname2: string;
  Email: string;
  CellPhone: string;
}

export interface DepartmentProgram {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  departmentHead: DepartmentHead;
  departmentProgram: DepartmentProgram;
  departmentHeadId: string;
}

export interface DepartmentsResponse {
  data: Department[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}


