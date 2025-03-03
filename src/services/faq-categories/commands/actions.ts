import httpClient from '@/helpers/httpClient';
import { FaqCategoryAPI } from '@/types';

const URL_BASE = '/faq-categories';

/**
 * Función para crear una nueva categoría de FAQ.
 */
export const createFaqCategory = async (
  data: FaqCategoryAPI.Requests.Create,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient<FaqCategoryAPI.Responses.Single>({
    method: 'POST',
    endpoint: URL_BASE,
    data,
  });
};

/**
 * Función para actualizar una categoría de FAQ.
 */
export const updateFaqCategory = async (
  params: FaqCategoryAPI.Params.ById,
  data: FaqCategoryAPI.Requests.Update,
): Promise<FaqCategoryAPI.Responses.Single> => {
  return await httpClient<FaqCategoryAPI.Responses.Single>({
    method: 'PUT',
    endpoint: `${URL_BASE}/${params.id}`,
    data,
  });
};

/**
 * Función para eliminar una categoría de FAQ.
 */
export const deleteFaqCategory = async (
  params: FaqCategoryAPI.Params.ById,
): Promise<void> => {
  await httpClient({
    method: 'DELETE',
    endpoint: `${URL_BASE}/${params.id}`,
  });
};
