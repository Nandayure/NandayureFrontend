import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { HolidayAPI } from '@/types';

/**
 * Función para obtener una lista de Holidays.
 * 
 * @returns {Promise<HolidayAPI.Responses.List>} Promesa que resuelve a la lista de Holidays
 */
export const fetchHolidays = async (): Promise<HolidayAPI.Responses.List> => {
  return await httpClient.get<HolidayAPI.Responses.List>(ROUTES.HOLIDAYS.BASE);
};

/**
 * Función para obtener un Holiday por ID.
 * 
 * @param {number} id - ID del Holiday a obtener
 * @returns {Promise<HolidayAPI.Responses.Single>} Promesa que resuelve al Holiday solicitado
 */
export const fetchHolidayById = async (
  id: number,
): Promise<HolidayAPI.Responses.Single> => {
  return await httpClient.get<HolidayAPI.Responses.Single>(ROUTES.HOLIDAYS.BY_ID(id));
};
