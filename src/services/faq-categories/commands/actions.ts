import httpClient from '@/helpers/httpClient';
import { FaqCategoryCreate, FaqCategoryUpdate, FaqCategoryAPI } from '@/types';

const URL_BASE = '/faq-categories';

/**
 * Función para crear una nueva categoría de FAQ.
 */
export const createFaqCategory = async (
  data: FaqCategoryCreate,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient<FaqCategoryAPI.Responses.Single>({
    method: 'POST',
    endpoint: URL_BASE,
    data,
  });
};

/**
 * Función para eliminar una categoría de FAQ.
 */
export const updateFaqCategory = async (
  id: number,
  data: FaqCategoryUpdate,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient<FaqCategoryAPI.Responses.Single>({
    method: 'PUT',
    endpoint: `${URL_BASE}/${id}`,
    data,
  });
};
