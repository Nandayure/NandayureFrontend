import httpClient from '@/helpers/httpClient';
import { FaqAPI } from '@/types';

const URL_BASE = '/faqs';

/**
 * Función para crear un nuevo FAQ.
 */
export const createFaq = async (
  data: FaqAPI.Requests.Create,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient<FaqAPI.Responses.Single>({
    method: 'POST',
    endpoint: URL_BASE,
    data,
  });
};

/**
 * Función para actualizar un FAQ existente.
 */
export const updateFaq = async (
  id: number,
  data: FaqAPI.Requests.Update,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient<FaqAPI.Responses.Single>({
    method: 'PUT',
    endpoint: `${URL_BASE}/${id}`,
    data,
  });
};

/**
 * Función para eliminar un FAQ.
 */
export const deleteFaq = async (id: number): Promise<void> => {
  await httpClient({
    method: 'DELETE',
    endpoint: `${URL_BASE}/${id}`,
  });
};

/**
 * Función para actualizar el estado de un FAQ.
 */
export const updateFaqStatus = async (
  id: number,
  status: string,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient<FaqAPI.Responses.Single>({
    method: 'PATCH',
    endpoint: `${URL_BASE}/${id}`,
    data: { status },
  });
};
