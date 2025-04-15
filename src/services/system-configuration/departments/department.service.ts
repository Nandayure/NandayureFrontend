import httpClient from "@/helpers/http-client";
import { UpdateDepartmentHeadRequest } from "@/types/department";

export const updateDepartmentHead = async (id: string, data: UpdateDepartmentHeadRequest) => {
  return await httpClient.patch(`/departments/updateDepartmentHead/${id}`, data);
};