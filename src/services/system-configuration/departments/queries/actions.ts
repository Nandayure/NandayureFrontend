import { Department, DepartmentEmployees } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { DepartmentsResponse, GetDepartmentsQueryParams } from '@/types/system-configuration/departaments/departments.response';

/**
 * Obtiene todos los departamentos
 * 
 * @param {GetDepartmentsQueryParams} params - Parámetros de consulta
 * @returns {Promise<DepartmentsResponse>} Promesa que resuelve con la lista paginada de departamentos
 */
export const getAllDepartments = async (params?: GetDepartmentsQueryParams): Promise<DepartmentsResponse> => {
  return await httpClient.get<DepartmentsResponse>(ROUTES.DEPARTMENTS.BASE, { params });
};

/**
 * Obtiene un departamento por su ID
 * 
 * @param {number} departmentId - ID del departamento
 * @returns {Promise<Department>} Promesa que resuelve con el departamento solicitado
 */
export const getDepartmentById = async (departmentId: number): Promise<Department> => {
  return await httpClient.get<Department>(ROUTES.DEPARTMENTS.BY_ID(departmentId));
};

/**
 * Obtiene todos los empleados de un departamento por su ID
 *  
 * @param {number} departmentId - ID del departamento
 * 
 * */
export const getAllEmployeesByDepartmentId = async (departmentId: number): Promise<DepartmentEmployees[]> => {
  return await httpClient.get<DepartmentEmployees[]>(ROUTES.DEPARTMENTS.EMPLOYEES(departmentId));
}
