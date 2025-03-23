import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

interface CheckResponse {
  exists: boolean;
}

/**
 * Verifica si un email existe en el sistema
 * 
 * @param {string} email - Email a verificar
 * @returns {Promise<CheckResponse>} Promesa que resuelve con la respuesta de verificación
 */
export const checkEmail = async (email: string): Promise<CheckResponse> => {
  return await httpClient.get<CheckResponse>(ROUTES.AUTH.CHECK_EMAIL, {
    params: { email }
  });
};

/**
 * Verifica si un id existe en el sistema
 * 
 * @param {string} id - ID a verificar
 * @returns {Promise<CheckResponse>} Promesa que resuelve con la respuesta de verificación
 */
export const checkId = async (id: string): Promise<CheckResponse> => {
  return await httpClient.get<CheckResponse>(ROUTES.AUTH.CHECK_ID, {
    params: { id }
  });
};