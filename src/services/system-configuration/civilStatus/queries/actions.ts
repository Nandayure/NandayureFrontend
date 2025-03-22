import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { CivilStatus } from '@/types';

/**
 * Obtiene todos los estados civiles
 * 
 * @returns {Promise<CivilStatus[]>} Promesa que resuelve con la lista de estados civiles
 */
export const getAllCivilStatus = async (): Promise<CivilStatus[]> => {
  return await httpClient.get<CivilStatus[]>(ROUTES.CIVIL_STATUS.BASE);
};

/**
 * Obtiene un estado civil por su ID
 * 
 * @param {number} civilStatusId - ID del estado civil
 * @returns {Promise<CivilStatus>} Promesa que resuelve con el estado civil solicitado
 */
export const getCivilStatusById = async (civilStatusId: number): Promise<CivilStatus> => {
  return await httpClient.get<CivilStatus>(ROUTES.CIVIL_STATUS.BY_ID(civilStatusId));
};