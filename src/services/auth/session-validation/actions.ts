import { ROUTES } from "@/constants/api-routes/routes";
import httpClient from "@/helpers/http-client";

/**
 * Validates the current user session by making a GET request to the session validation endpoint.
 * @returns {Promise<any>} A promise that resolves with the session validation response
 * @throws {Error} If the request fails or the session is invalid
 */
export const sessionValidation = async () => {
  return await httpClient.get(ROUTES.AUTH.SESSION_VALIDATION);
}