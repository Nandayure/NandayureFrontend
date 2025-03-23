import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { FaqCategoryAPI } from '@/types';

/**
 * Función para crear una nueva categoría de FAQ.
 * 
 * @param {FaqCategoryAPI.Requests.Create} data - Datos para crear la categoría de FAQ
 * @returns {Promise<FaqCategoryAPI.Responses.Single>} Promesa que resuelve a la categoría de FAQ creada
 */
export const createFaqCategory = async (
  data: FaqCategoryAPI.Requests.Create,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient.post<FaqCategoryAPI.Responses.Single>(ROUTES.FAQ_CATEGORIES.BASE, data);
};

/**
 * Función para actualizar una categoría de FAQ.
 * 
 * @param {FaqCategoryAPI.Params.ById} params - Parámetros de identificación de la categoría
 * @param {FaqCategoryAPI.Requests.Update} data - Datos para actualizar la categoría de FAQ
 * @returns {Promise<FaqCategoryAPI.Responses.Single>} Promesa que resuelve a la categoría de FAQ actualizada
 */
export const updateFaqCategory = async (
  params: FaqCategoryAPI.Params.ById,
  data: FaqCategoryAPI.Requests.Update,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient.patch<FaqCategoryAPI.Responses.Single>(
    ROUTES.FAQ_CATEGORIES.BY_ID(params.id),
    data
  );
};

/**
 * Función para eliminar una categoría de FAQ.
 * 
 * @param {FaqCategoryAPI.Params.ById} params - Parámetros de identificación de la categoría
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteFaqCategory = async (
  params: FaqCategoryAPI.Params.ById,
): Promise<void> => {
  await httpClient.delete(ROUTES.FAQ_CATEGORIES.BY_ID(params.id));
};