import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { HolidayAPI } from '@/types';

/**
 * Función para crear un nuevo Holiday.
 * 
 * @param {HolidayAPI.Requests.Create} data - Datos para crear el Holiday
 * @returns {Promise<HolidayAPI.Responses.Single>} Promesa que resuelve al Holiday creado
 */
export const createHoliday = async (
  data: HolidayAPI.Requests.Create,
): Promise<HolidayAPI.Responses.Single> => {
  return await httpClient.post<HolidayAPI.Responses.Single>(ROUTES.HOLIDAYS.BASE, data);
};

/**
 * Función para actualizar un Holiday existente.
 * 
 * @param {number} id - ID del Holiday a actualizar
 * @param {HolidayAPI.Requests.Update} data - Datos de actualización
 * @returns {Promise<HolidayAPI.Responses.Single>} Promesa que resuelve al Holiday actualizado
 */
export const updateHoliday = async (
  id: number,
  data: HolidayAPI.Requests.Update,
): Promise<HolidayAPI.Responses.Single> => {
  return await httpClient.patch<HolidayAPI.Responses.Single>(ROUTES.HOLIDAYS.BY_ID(id), data);
};

/**
 * Función para eliminar un Holiday.
 * 
 * @param {number} id - ID del Holiday a eliminar
 * @returns {Promise<void>} Promesa vacía que resuelve cuando se completa la eliminación
 */
export const deleteHoliday = async (id: number): Promise<void> => {
  await httpClient.delete(ROUTES.HOLIDAYS.BY_ID(id));
};

/**
 * Función para actualizar el estado de un Holiday.
 * 
 * @param {number} id - ID del Holiday a actualizar
 * @param {boolean} isActive - Nuevo estado de activación
 * @returns {Promise<HolidayAPI.Responses.Single>} Promesa que resuelve al Holiday con el estado actualizado
 */
export const updateHolidayStatus = async (
  id: number,
  isActive: boolean,
): Promise<HolidayAPI.Responses.Single> => {
  return await httpClient.patch<HolidayAPI.Responses.Single>(ROUTES.HOLIDAYS.BY_ID(id), { isActive });
};