import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { RequestVacation } from '@/types';

/**
 * Crea una nueva solicitud de vacaciones
 * 
 * @param {RequestVacation} vacation - Datos de la solicitud de vacaciones
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const postVacation = async (vacation: RequestVacation): Promise<any> => {
  return await httpClient.post(ROUTES.VACATION.BASE, vacation);
};

/**
 * Obtiene las solicitudes de vacaciones
 * 
 * @returns {Promise<any>} Promesa que resuelve con la lista de solicitudes de vacaciones
 */
export const getVacation = async (): Promise<any> => {
  return await httpClient.get(ROUTES.VACATION.BASE);
};