import { ROUTES } from "@/constants/api-routes/routes";
import httpClient from "@/helpers/http-client";


/**
 * Elimina un empleado por su ID
 *  
  * @param {number} employeeId - ID del empleado a eliminar
  * @returns {Promise<void>} Promesa que resuelve cuando el empleado ha sido eliminado
  * @throws {Error} Si ocurre un error durante la eliminación
  */
export const deleteEmployee = async (employeeId: number): Promise<void> => {
  return await httpClient.delete(ROUTES.EMPLOYEES.DELETE(employeeId));
}


/**
 * Restaura un empleado eliminado por su ID
 * 
 * @param {number} employeeId - ID del empleado a restaurar
 * @returns {Promise<void>} Promesa que resuelve cuando el empleado ha sido restaurado
 * @throws {Error} Si ocurre un error durante la restauración
 */
export const restoreEmployee = async (employeeId: number): Promise<void> => {
  return await httpClient.patch(ROUTES.EMPLOYEES.RESTORE(employeeId));
}