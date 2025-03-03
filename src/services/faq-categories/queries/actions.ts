import httpClient from '@/helpers/httpClient';
import { FaqCategory, FaqCategoryAPI } from '@/types';

const URL_BASE = '/faq-categories';

/**
 * Función para obtener una lista de categorías de FAQ.
 */
export const fetchFaqCategories = async (): Promise<FaqCategory[]> => {
  return await httpClient<FaqCategoryAPI.Responses.List>({
    method: 'GET',
    endpoint: URL_BASE,
  });
};

/**
 * Función para obtener una categoría de FAQ por ID.
 */
export const fetchFaqCategoryById = async (
  id: number,
): Promise<FaqCategory> => {
  return await httpClient<FaqCategoryAPI.Responses.Single>({
    method: 'GET',
    endpoint: `${URL_BASE}/${id}`,
  });
};
