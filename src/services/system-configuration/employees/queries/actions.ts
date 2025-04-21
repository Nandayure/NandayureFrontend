import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { Employee } from '@/types';

interface GetEmployeesResponse {
  data: Employee[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface GetEmployeesQueryParams {
  page?: string;
  limit?: string;
  name?: string;
}

/**
 * Obtiene todos los empleados con paginación y filtros
 * 
 * @param {GetEmployeesQueryParams} params - Parámetros de consulta
 * @returns {Promise<GetEmployeesResponse>} Promesa que resuelve con la lista paginada de empleados
 */
export const getAllEmployees = async (params?: GetEmployeesQueryParams): Promise<GetEmployeesResponse> => {
  return await httpClient.get<GetEmployeesResponse>(ROUTES.EMPLOYEES.BASE, { params });
};

/**
 * Obtiene los empleados eliminados
 * 
 * @returns {Promise<Employee[]>} Promesa que resuelve con la lista de empleados eliminados
 */
export const fetchEmployeesDeleted = async (): Promise<Employee[]> => {
  return await httpClient.get<Employee[]>(ROUTES.EMPLOYEES.GET_DELETED);
}