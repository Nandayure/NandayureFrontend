import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { ResetPassword } from '@/types';

/**
 * Restablece la contraseña de un usuario utilizando un token de autorización.
 * 
 * @param {ResetPassword} resetPassword - Objeto con la nueva contraseña
 * @param {string} token - Token de autorización para restablecer la contraseña
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor después de restablecer la contraseña
 * @throws {Error} Si la solicitud no se puede completar o el servidor devuelve un error
 */
export const postResetPassword = async (
  resetPassword: ResetPassword,
  token: string
): Promise<any> => {
  return await httpClient.put(`${ROUTES.AUTH.RESET_PASSWORD}`,
    { newPassword: resetPassword.Password },
    {
      customToken: token,
    }
  );
};