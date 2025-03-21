import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { Study } from '@/types';

/**
 * Obtiene una lista de estudios.
 * 
 * @returns {Promise<Study[]>} Promesa que resuelve a la lista de estudios
 */
export const getAllStudies = async (): Promise<Study[]> => {
  return await httpClient.get<Study[]>(`${ROUTES.STUDIES.BASE}`);
}

/**
 * Obtiene un estudio por ID.
 * 
 * @param {number} studyId - ID del estudio
 * @returns {Promise<Study>} Promesa que resuelve al estudio solicitado
 */

export const getStudyById = async (studyId: number): Promise<Study> => {
  return await httpClient.get<Study>(`${ROUTES.STUDIES.BY_ID(studyId)}`);
}

