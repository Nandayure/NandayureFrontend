import httpClient from "@/helpers/http-client";
import { ROUTES } from "@/constants/api-routes/routes";
import { AddRoleToUser,RemoveRoleToUser } from "@/types";


/**
 * Adds a role to a user.
 * @async
 * @param {AddRoleToUser} data - The data containing the user ID and role ID to be added.
 * @returns {Promise<void>} A promise that resolves when the role is successfully added.
 * @throws {Error} If the HTTP request fails.
 */
export const addRoleToUser = async (data: AddRoleToUser): Promise<void> => {
  return await httpClient.post(ROUTES.ROLES_MANAGEMENT.ADD_ROLE_TO_USER, data);
}

/**
 * Removes a role from a user.
 * @async
 * @param {RemoveRoleToUser} data - The data containing the user ID and role ID to be removed.
 * @returns {Promise<void>} A promise that resolves when the role is successfully removed.
 * @throws {Error} If the HTTP request fails.
 */
export const removeRoleToUser = async (data: RemoveRoleToUser): Promise<void> => {
  return await httpClient.post(ROUTES.ROLES_MANAGEMENT.REMOVE_ROLE_FROM_USER, data);
}