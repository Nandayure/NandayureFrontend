import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { FaqAPI } from '@/types';

/**
 * Función para obtener una lista de FAQs.
 * 
 * @returns {Promise<FaqAPI.Responses.List>} Promesa que resuelve a la lista de FAQs
 */
export const fetchFaqs = async (): Promise<FaqAPI.Responses.List> => {
  return await httpClient.get<FaqAPI.Responses.List>(ROUTES.FAQS.BASE);
};

/**
 * Función para obtener un FAQ por ID.
 * 
 * @param {number} id - ID del FAQ a obtener
 * @returns {Promise<FaqAPI.Responses.Single>} Promesa que resuelve al FAQ solicitado
 */
export const fetchFaqById = async (
  id: number,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.get<FaqAPI.Responses.Single>(ROUTES.FAQS.BY_ID(id));
};

/**
 * Función para obtener FAQs por categoría.
 * 
 * @param {number} categoryId - ID de la categoría para filtrar
 * @returns {Promise<FaqAPI.Responses.List>} Promesa que resuelve a la lista de FAQs de la categoría
 */
export const fetchFaqsByCategoryId = async (
  categoryId: number,
): Promise<FaqAPI.Responses.List> => {
  return await httpClient.get<FaqAPI.Responses.List>(`${ROUTES.FAQS.BASE}/category/${categoryId}`);
};