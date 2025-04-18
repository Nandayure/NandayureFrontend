import { ROUTES } from "@/constants/api-routes/routes";
import httpClient from "@/helpers/http-client";
import { ChangeUserStatus } from "@/types/user/user";

/**
  * Cambia el estado de un usuario (activo/inactivo).
  *
  * @param {ChangeUserStatus} data - Datos del usuario a actualizar.
  * @returns {Promise<ChangeUserStatus>} Promesa que resuelve con el usuario actualizado.
  */
export const changeUserStatus = async (data: ChangeUserStatus): Promise<ChangeUserStatus> => {
  return await httpClient.patch<ChangeUserStatus>(ROUTES.USERS.CHANGE_USER_STATUS, data);
}