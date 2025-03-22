import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { FaqCategoryAPI } from '@/types';

/**
 * Función para obtener una lista de categorías de FAQ.
 * 
 * @returns {Promise<FaqCategoryAPI.Responses.List>} Promesa que resuelve a la lista de categorías de FAQ
 */
export const fetchFaqCategories = async (): Promise<FaqCategoryAPI.Responses.List> => {
  return await httpClient.get<FaqCategoryAPI.Responses.List>(ROUTES.FAQ_CATEGORIES.BASE);
};

/**
 * Función para obtener una categoría de FAQ por ID.
 * 
 * @param {number} id - ID de la categoría de FAQ a obtener
 * @returns {Promise<FaqCategoryAPI.Responses.Single>} Promesa que resuelve a la categoría de FAQ solicitada
 */
export const fetchFaqCategoryById = async (
  id: number,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient.get<FaqCategoryAPI.Responses.Single>(ROUTES.FAQ_CATEGORIES.BY_ID(id));
};