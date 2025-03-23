import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { ChangePassword } from '@/types';

/**
 * Cambia la contraseña del usuario actual.
 * 
 * @param {ChangePassword} resetPassword - Objeto con la información para cambiar la contraseña
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor después de cambiar la contraseña
 */
export const postChangePassword = async (resetPassword: ChangePassword): Promise<any> => {
  return await httpClient.post(`${ROUTES.AUTH.CHANGE_PASSWORD}`, {
    oldPassword: resetPassword.OldPassword,
    newPassword: resetPassword.Password,
  });
};