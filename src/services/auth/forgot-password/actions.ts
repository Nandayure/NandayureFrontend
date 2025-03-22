import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { ForgotPassword } from '@/types';

/**
 * Envía una solicitud de restablecimiento de contraseña para un usuario.
 * 
 * @param {ForgotPassword} email - Objeto con el correo electrónico para restablecer la contraseña
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor después de enviar la solicitud de restablecimiento de contraseña
 */
export const postForgotPassword = async (email: ForgotPassword): Promise<any> => {
  return await httpClient.post(`${ROUTES.AUTH.FORGOT_PASSWORD}`, email, {
    sendToken: false,
  });
};