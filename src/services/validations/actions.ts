import httpClient from "@/helpers/httpClient";

const BASE_PATH = "/auth"

interface CheckResponse {
  exists: boolean;
}

/**
 * Verifica si un email existe en el sistema
 * GET /api/v1/auth/check-email?email=ejemplo@correo.com
 */
export const checkEmail = async (email: string): Promise<CheckResponse> => {
  return await httpClient<CheckResponse>({
    method: 'GET',
    endpoint: `${BASE_PATH}/check-email`,
    params: { email },
  });
};

/**
 * Verifica si un id existe en el sistema
 * GET /api/v1/auth/check-id?id=123456
 */

export const checkId = async (id: string): Promise<CheckResponse> => {
  return await httpClient<CheckResponse>({
    method: 'GET',
    endpoint: `${BASE_PATH}/check-id`,
    params: { id },
  });
}

