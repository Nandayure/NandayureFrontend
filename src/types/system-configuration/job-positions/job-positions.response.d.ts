import { BaseFilterParams } from '@/types/common/base-filter';

export interface GetJobPositionsQueryParams extends BaseFilterParams { }

export interface JobPosition {
  id: number;
  Name: string;
  Description: string;
  DepartmentId: number;
}

export interface JobPositionsResponse {
  data: JobPosition[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}