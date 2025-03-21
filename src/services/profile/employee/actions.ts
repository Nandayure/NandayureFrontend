import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { Employee, UpdateEmployee } from '@/types';

/**
 * Propiedades para obtener un empleado por ID
 */
interface GetEmployeeByIdProps {
  /**
   * ID del empleado
   */
  employeeId: number;
}

/**
 * Propiedades para actualizar un empleado
 */
interface UpdateEmployeeProps {
  /**
   * ID del empleado a actualizar
   */
  employeeId: number;

  /**
   * Datos de actualización del empleado
   */
  employee: UpdateEmployee;
}

/**
 * Obtiene un empleado por su ID
 * 
 * @param {GetEmployeeByIdProps} params - Parámetros para obtener el empleado
 * @returns {Promise<Employee>} Promesa que resuelve al empleado solicitado
 */
export const getByIdEmployee = async ({
  employeeId,
}: GetEmployeeByIdProps): Promise<Employee> => {
  return await httpClient.get<Employee>(ROUTES.EMPLOYEES.BY_ID(employeeId));
};

/**
 * Actualiza los datos de un empleado
 * 
 * @param {UpdateEmployeeProps} params - Parámetros para actualizar el empleado
 * @returns {Promise<UpdateEmployee>} Promesa que resuelve a los datos del empleado actualizados
 */
export const updateEmployee = async ({
  employeeId,
  employee,
}: UpdateEmployeeProps): Promise<UpdateEmployee> => {
  return await httpClient.patch<UpdateEmployee>(ROUTES.EMPLOYEES.BY_ID(employeeId), employee);
};