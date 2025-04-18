import httpClient from "@/helpers/http-client";
import { ROUTES } from "@/constants/api-routes/routes";
import { ActiveUser, InactiveUser } from "@/types";

/**
 * Fetches available users from the server.
 *
 * @returns {Promise<ActiveUser[]>} A promise that resolves to an array of available users.
 */
export const fetchAvailableUsers = async (): Promise<(ActiveUser)[]> => {
  return await httpClient.get<(ActiveUser)[]>(ROUTES.USERS.AVAILABLE_USERS);
}

/**
 * Fetches unavailable users from the server.
 *
 * @returns {Promise<InactiveUser[]>} A promise that resolves to an array of unavailable users.
 */
export const fetchUnavailableUsers = async (): Promise<(InactiveUser)[]> => {
  return await httpClient.get<(InactiveUser)[]>(ROUTES.USERS.UNAVAILABLE_USERS);
}
