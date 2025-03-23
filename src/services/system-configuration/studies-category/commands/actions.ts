import { StudiesCategory, PatchStudiesCategory } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Crea una nueva categoría de estudios 
 * 
 * @param {StudiesCategory} studiesCategory - Datos de la categoría de estudios a crear
 * @returns {Promise<StudiesCategory>} Promesa que resuelve con la categoría de estudios creada
 */
export const postStudiesCategory = async (studiesCategory: StudiesCategory): Promise<StudiesCategory> => {
  return await httpClient.post<StudiesCategory>(ROUTES.STUDIES_CATEGORY.BASE, studiesCategory);
};

/**
 * Actualiza una categoría de estudios existente
 * 
 * @param {string} studiesCategoryId - ID de la categoría de estudios a actualizar
 * @param {PatchStudiesCategory} studiesCategory - Datos para actualizar la categoría de estudios
 * @returns {Promise<StudiesCategory>} Promesa que resuelve con la categoría de estudios actualizada
 */
export const patchStudiesCategory = async (
  studiesCategoryId: string,
  studiesCategory: PatchStudiesCategory
): Promise<StudiesCategory> => {
  return await httpClient.patch<StudiesCategory>(
    ROUTES.STUDIES_CATEGORY.BY_ID(studiesCategoryId),
    studiesCategory
  );
};

/**
 * Elimina una categoría de estudios
 * 
 * @param {string} studiesCategoryId - ID de la categoría de estudios a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteStudiesCategory = async (studiesCategoryId: string): Promise<void> => {
  await httpClient.delete(ROUTES.STUDIES_CATEGORY.BY_ID(studiesCategoryId));
};