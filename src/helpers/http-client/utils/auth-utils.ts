import { getSession } from 'next-auth/react';

/**
 * Obtiene el token de autenticación de la sesión de usuario o un token personalizado
 * 
 * @param customToken - Token personalizado opcional para usar en lugar del token de sesión
 * @returns El token de autenticación o undefined si no está disponible
 */
export async function getAuthToken(customToken?: string): Promise<string | undefined> {
  if (customToken) {
    return customToken;
  }
  const session = await getSession();
  return session?.user?.access_token;
}