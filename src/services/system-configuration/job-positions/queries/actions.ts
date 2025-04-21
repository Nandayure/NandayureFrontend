import { JobPosition, JobPositionsResponse, GetJobPositionsQueryParams } from '@/types/system-configuration/job-positions/job-positions.response';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Obtiene todos los puestos de trabajo con paginación y filtros
 * 
 * @param {GetJobPositionsQueryParams} params - Parámetros de consulta
 * @returns {Promise<JobPositionsResponse>} Promesa que resuelve con la lista paginada de puestos
 */
export const getAllJobPositions = async (params?: GetJobPositionsQueryParams): Promise<JobPositionsResponse> => {
  return await httpClient.get<JobPositionsResponse>(ROUTES.JOB_POSITIONS.BASE, { params });
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