import { Department, PatchDepartment, UpdateDepartmentHead } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Propiedades para actualizar un departamento
 */
interface PatchDepartmentProps {
  /**
   * ID del departamento a actualizar
   */
  departmentId: number;

  /**
   * Datos para actualizar el departamento
   */
  department: PatchDepartment;
}

/**
 * Crea un nuevo departamento
 * 
 * @param {Department} data - Datos del departamento a crear
 * @returns {Promise<Department>} Promesa que resuelve con el departamento creado
 */
export const postDepartment = async (data: Department): Promise<Department> => {
  return await httpClient.post<Department>(ROUTES.DEPARTMENTS.BASE, data);
};

/**
 * Actualiza un departamento existente
 * 
 * @param {PatchDepartmentProps} props - Propiedades para actualizar el departamento
 * @returns {Promise<Department>} Promesa que resuelve con el departamento actualizado
 */
export const patchDepartment = async ({
  departmentId,
  department,
}: PatchDepartmentProps): Promise<Department> => {
  return await httpClient.patch<Department>(
    ROUTES.DEPARTMENTS.BY_ID(departmentId),
    department
  );
};

/**
 * Elimina un departamento
 * 
 * @param {number} departmentId - ID del departamento a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteDepartment = async (departmentId: number): Promise<void> => {
  await httpClient.delete(ROUTES.DEPARTMENTS.BY_ID(departmentId));
};


/**
 * Actualiza el jefe de un departamento
 *
 * @param {number} departmentId - ID del departamento
 */

export const updateDepartmentHead = async (
  departmentId: number,
  departmentHeadId: string
): Promise<UpdateDepartmentHead> => {
  return await httpClient.patch<UpdateDepartmentHead>(
    ROUTES.DEPARTMENTS.UPDATE_HEAD(departmentId),
    { departmentHeadId }
  );
}