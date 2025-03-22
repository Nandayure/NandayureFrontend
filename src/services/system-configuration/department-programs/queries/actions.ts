import { DepartmentProgram } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Obtiene todos los programas de departamento
 * 
 * @returns {Promise<DepartmentProgram[]>} Promesa que resuelve con la lista de programas de departamento
 */
export const getAllDepartmentPrograms = async (): Promise<DepartmentProgram[]> => {
  return await httpClient.get<DepartmentProgram[]>(ROUTES.DEPARTMENT_PROGRAMS.BASE);
};

/**
 * Obtiene un programa de departamento por su ID
 * 
 * @param {number} departmentProgramId - ID del programa de departamento
 * @returns {Promise<DepartmentProgram>} Promesa que resuelve con el programa de departamento solicitado
 */
export const getDepartmentProgramById = async (departmentProgramId: number): Promise<DepartmentProgram> => {
  return await httpClient.get<DepartmentProgram>(ROUTES.DEPARTMENT_PROGRAMS.BY_ID(departmentProgramId));
};