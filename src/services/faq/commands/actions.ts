import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { FaqAPI } from '@/types';

/**
 * Función para crear un nuevo FAQ.
 * 
 * @param {FaqAPI.Requests.Create} data - Datos para crear el FAQ
 * @returns {Promise<FaqAPI.Responses.Single>} Promesa que resuelve al FAQ creado
 */
export const createFaq = async (
  data: FaqAPI.Requests.Create,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.post<FaqAPI.Responses.Single>(ROUTES.FAQS.BASE, data);
};

/**
 * Función para actualizar un FAQ existente.
 * 
 * @param {number} id - ID del FAQ a actualizar
 * @param {FaqAPI.Requests.Update} data - Datos de actualización
 * @returns {Promise<FaqAPI.Responses.Single>} Promesa que resuelve al FAQ actualizado
 */
export const updateFaq = async (
  id: number,
  data: FaqAPI.Requests.Update,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.patch<FaqAPI.Responses.Single>(ROUTES.FAQS.BY_ID(id), data);
};

/**
 * Función para eliminar un FAQ.
 * 
 * @param {number} id - ID del FAQ a eliminar
 * @returns {Promise<void>} Promesa vacía que resuelve cuando se completa la eliminación
 */
export const deleteFaq = async (id: number): Promise<void> => {
  await httpClient.delete(ROUTES.FAQS.BY_ID(id));
};

/**
 * Función para actualizar el estado de un FAQ.
 * 
 * @param {number} id - ID del FAQ a actualizar
 * @param {string} status - Nuevo estado
 * @returns {Promise<FaqAPI.Responses.Single>} Promesa que resuelve al FAQ con el estado actualizado
 */
export const updateFaqStatus = async (
  id: number,
  status: string,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.patch<FaqAPI.Responses.Single>(ROUTES.FAQS.BY_ID(id), { status });
};