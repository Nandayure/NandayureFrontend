import httpClient from "@/helpers/http-client";
import { ROUTES } from "@/constants/api-routes/routes";
import { AvailableUserResponse, GetUsersQueryParams } from "@/types/user/user.response";


export const fetchAllUsers = async (params?: GetUsersQueryParams): Promise<AvailableUserResponse> => {
  return await httpClient.get<AvailableUserResponse>(ROUTES.USERS.ALL_USERS, { params });
}
