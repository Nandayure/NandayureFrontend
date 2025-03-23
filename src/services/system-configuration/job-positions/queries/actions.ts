import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { JobPosition } from '@/types';

/**
 * Obtiene todos los puestos de trabajo
 * 
 * @returns {Promise<JobPosition[]>} Promesa que resuelve con la lista de puestos de trabajo
 */
export const getAllJobPositions = async (): Promise<JobPosition[]> => {
  return await httpClient.get<JobPosition[]>(ROUTES.JOB_POSITIONS.BASE);
};

/**
 * Obtiene un puesto de trabajo por su ID
 * 
 * @param {number} jobPositionId - ID del puesto de trabajo
 * @returns {Promise<JobPosition>} Promesa que resuelve con el puesto de trabajo solicitado
 */
export const getJobPositionsById = async (jobPositionId: number): Promise<JobPosition> => {
  return await httpClient.get<JobPosition>(ROUTES.JOB_POSITIONS.BY_ID(jobPositionId));
};