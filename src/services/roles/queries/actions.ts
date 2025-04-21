import { ROUTES } from "@/constants/api-routes/routes";
import httpClient from "@/helpers/http-client";
import { Roles } from "@/types";

/**
 * Fetches all roles from the server.
 * @async
 * @returns {Promise<Roles>} A promise that resolves to the roles data.
 * @throws {Error} If the HTTP request fails.
 */
export const fetchRoles = async () => {
  return httpClient.get<Roles>(ROUTES.ROLES_MANAGEMENT.BASE)
}