import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { Employee } from '@/types';

/**
 * Crea un nuevo empleado en el sistema.
 * 
 * @param {Employee} employee - Objeto con la información del empleado a crear
 * @returns {Promise<Employee>} Promesa que resuelve con el empleado recién creado
 */
export const postEmployee = async (employee: Employee): Promise<Employee> => {
  return await httpClient.post<Employee>(`${ROUTES.EMPLOYEES}`, employee);
};