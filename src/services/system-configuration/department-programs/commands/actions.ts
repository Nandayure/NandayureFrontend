import { DepartmentProgram, PatchDepartmentProgram } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Propiedades para actualizar un programa de departamento
 */
interface PatchDepartmentProgramProps {
  /**
   * ID del programa de departamento a actualizar
   */
  departmentProgramId: number;

  /**
   * Datos para actualizar el programa de departamento
   */
  department: PatchDepartmentProgram;
}

/**
 * Crea un nuevo programa de departamento
 * 
 * @param {DepartmentProgram} data - Datos del programa de departamento a crear
 * @returns {Promise<DepartmentProgram>} Promesa que resuelve con el programa de departamento creado
 */
export const postDepartmentProgram = async (data: DepartmentProgram): Promise<DepartmentProgram> => {
  return await httpClient.post<DepartmentProgram>(ROUTES.DEPARTMENT_PROGRAMS.BASE, data);
};

/**
 * Actualiza un programa de departamento existente
 * 
 * @param {PatchDepartmentProgramProps} props - Propiedades para actualizar el programa de departamento
 * @returns {Promise<DepartmentProgram>} Promesa que resuelve con el programa de departamento actualizado
 */
export const patchDepartmentProgram = async ({
  departmentProgramId,
  department,
}: PatchDepartmentProgramProps): Promise<DepartmentProgram> => {
  return await httpClient.patch<DepartmentProgram>(
    ROUTES.DEPARTMENT_PROGRAMS.BY_ID(departmentProgramId),
    department
  );
};

/**
 * Elimina un programa de departamento
 * 
 * @param {number} departmentProgramId - ID del programa de departamento a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteDepartmentProgram = async (departmentProgramId: number): Promise<void> => {
  await httpClient.delete(ROUTES.DEPARTMENT_PROGRAMS.BY_ID(departmentProgramId));
};