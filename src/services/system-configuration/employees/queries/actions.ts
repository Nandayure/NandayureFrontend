import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { Employee } from '@/types';

/**
 * Obtiene todos los empleados
 * 
 * @returns {Promise<Employee[]>} Promesa que resuelve con la lista de empleados
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  return await httpClient.get<Employee[]>(ROUTES.EMPLOYEES.BASE);
};