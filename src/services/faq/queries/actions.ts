import httpClient from '@/helpers/httpClient';
import { FaqAPI } from '@/types';

const URL_BASE = '/faqs';

/**
 * Función para obtener una lista de FAQs.
 */
export const fetchFaqs = async (): Promise<FaqAPI.Responses.List> => {
  return await httpClient<FaqAPI.Responses.List>({
    method: 'GET',
    endpoint: URL_BASE,
  });
};

/**
 * Función para obtener un FAQ por ID.
 */
export const fetchFaqById = async (
  id: number,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient<FaqAPI.Responses.Single>({
    method: 'GET',
    endpoint: `${URL_BASE}/${id}`,
  });
};

/**
 * Función para obtener FAQs por categoría.
 */
export const fetchFaqsByCategoryId = async (
  categoryId: number,
): Promise<FaqAPI.Responses.List> => {
  return await httpClient<FaqAPI.Responses.List>({
    method: 'GET',
    endpoint: `${URL_BASE}/category/${categoryId}`,
  });
};
