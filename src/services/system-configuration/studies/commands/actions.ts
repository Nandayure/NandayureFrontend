import { PatchStudy, Study } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Crea un nuevo estudio
 * 
 * @param {Study} study - Datos del estudio a crear
 * @returns {Promise<Study>} Promesa que resuelve con el estudio creado
 */
export const postStudy = async (study: Study): Promise<Study> => {
  return await httpClient.post<Study>(ROUTES.STUDIES.BASE, study);
};

/**
 * Actualiza un estudio existente
 * 
 * @param {number} studyId - ID del estudio a actualizar
 * @param {PatchStudy} study - Datos para actualizar el estudio
 * @returns {Promise<Study>} Promesa que resuelve con el estudio actualizado
 */
export const patchStudy = async (studyId: number, study: PatchStudy): Promise<Study> => {
  return await httpClient.patch<Study>(ROUTES.STUDIES.BY_ID(studyId), study);
};

/**
 * Elimina un estudio
 * 
 * @param {number} studyId - ID del estudio a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteStudy = async (studyId: number): Promise<void> => {
  await httpClient.delete(ROUTES.STUDIES.BY_ID(studyId));
};