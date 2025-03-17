import httpClient from '@/helpers/http-client';
import { FaqAPI } from '@/types';

const URL_BASE = '/faqs';

/**
 * Función para obtener una lista de FAQs.
 * 
 * @returns Promesa que resuelve a la lista de FAQs
 */
export const fetchFaqs = async (): Promise<FaqAPI.Responses.List> => {
  return await httpClient.get<FaqAPI.Responses.List>(URL_BASE);
};

/**
 * Función para obtener un FAQ por ID.
 * 
 * @param id - ID del FAQ a obtener
 * @returns Promesa que resuelve al FAQ solicitado
 */
export const fetchFaqById = async (
  id: number,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.get<FaqAPI.Responses.Single>(`${URL_BASE}/${id}`);
};

/**
 * Función para obtener FAQs por categoría.
 * 
 * @param categoryId - ID de la categoría para filtrar
 * @returns Promesa que resuelve a la lista de FAQs de la categoría
 */
export const fetchFaqsByCategoryId = async (
  categoryId: number,
): Promise<FaqAPI.Responses.List> => {
  return await httpClient.get<FaqAPI.Responses.List>(`${URL_BASE}/category/${categoryId}`);
};