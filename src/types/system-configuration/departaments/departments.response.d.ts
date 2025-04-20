import { BaseFilterParams } from "@/types/common/base-filter";

export type GetDepartmentsQueryParams = BaseFilterParams

export interface DepartmentHead {
  id: string;
  Surname1: string;
  Surname2: string;
  Email: string;
  CellPhone: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  departmentHead: DepartmentHead;
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


