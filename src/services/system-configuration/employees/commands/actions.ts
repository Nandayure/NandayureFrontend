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

/**
 * Actualiza la posición laboral de un empleado por su ID
 * 
 * @param {number} employeeId - ID del empleado a actualizar
 * @param {string} jobPosition - Nueva posición laboral del empleado
 * @returns {Promise<void>} Promesa que resuelve cuando la posición ha sido actualizada
 * @throws {Error} Si ocurre un error durante la actualización
 */
export const updateJobPosition = async (employeeId: number, jobPosition: string): Promise<void> => {
  return await httpClient.patch(ROUTES.EMPLOYEES.UPDATE_JOB_POSITION(employeeId), { jobPosition });
}