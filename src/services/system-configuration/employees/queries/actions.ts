import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { Employee } from '@/types';

/**
 * Obtiene todos los empleados
 * 
 * @returns {Promise<Employee[]>} Promesa que resuelve con la lista de empleados
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  return await httpClient.get<Employee[]>(ROUTES.EMPLOYEES.BASE);
};

/**
 * Obtiene los empleados eliminados
 * 
 * @returns {Promise<Employee[]>} Promesa que resuelve con la lista de empleados eliminados
 */
export const fetchEmployeesDeleted = async (): Promise<Employee[]> => {
  return await httpClient.get<Employee[]>(ROUTES.EMPLOYEES.GET_DELETED);
}