import { StudiesCategory } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Obtiene todas las categorías de estudios
 * 
 * @returns {Promise<StudiesCategory[]>} Promesa que resuelve con todas las categorías de estudios
 */
export const getAllStudiesCategories = async (): Promise<StudiesCategory[]> => {
  return await httpClient.get<StudiesCategory[]>(ROUTES.STUDIES_CATEGORY.BASE);
};

/**
 * Obtiene una categoría de estudios específica por su ID
 * 
 * @param {string} studiesCategoryId - ID de la categoría de estudios a obtener
 * @returns {Promise<StudiesCategory>} Promesa que resuelve con la categoría de estudios solicitada
 */
export const getStudiesCategoryById = async (studiesCategoryId: string): Promise<StudiesCategory> => {
  return await httpClient.get<StudiesCategory>(ROUTES.STUDIES_CATEGORY.BY_ID(studiesCategoryId));
};

