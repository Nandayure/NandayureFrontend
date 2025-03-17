import httpClient from '@/helpers/http-client';
import { FaqAPI } from '@/types';

const URL_BASE = '/faqs';

/**
 * Función para crear un nuevo FAQ.
 * 
 * @param data - Datos para crear el FAQ
 * @returns Promesa que resuelve al FAQ creado
 */
export const createFaq = async (
  data: FaqAPI.Requests.Create,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.post<FaqAPI.Responses.Single>(URL_BASE, data);
};

/**
 * Función para actualizar un FAQ existente.
 * 
 * @param id - ID del FAQ a actualizar
 * @param data - Datos de actualización
 * @returns Promesa que resuelve al FAQ actualizado
 */
export const updateFaq = async (
  id: number,
  data: FaqAPI.Requests.Update,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.patch<FaqAPI.Responses.Single>(`${URL_BASE}/${id}`, data);
};

/**
 * Función para eliminar un FAQ.
 * 
 * @param id - ID del FAQ a eliminar
 * @returns Promesa vacía que resuelve cuando se completa la eliminación
 */
export const deleteFaq = async (id: number): Promise<void> => {
  await httpClient.delete(`${URL_BASE}/${id}`);
};

/**
 * Función para actualizar el estado de un FAQ.
 * 
 * @param id - ID del FAQ a actualizar
 * @param status - Nuevo estado
 * @returns Promesa que resuelve al FAQ con el estado actualizado
 */
export const updateFaqStatus = async (
  id: number,
  status: string,
): Promise<FaqAPI.Responses.Single> => {
  return await httpClient.patch<FaqAPI.Responses.Single>(`${URL_BASE}/${id}`, { status });
};