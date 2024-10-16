import { Department } from "@/types";
import httpClient from "@/helpers/httpClient";

export async function getAllDepartments() {
  const departments = await httpClient<Department[]>({
    method: "GET",
    endpoint: "/departments",
  });
  return departments;
}

export async function getDepartmentById(departmentId: number) {
  const department = await httpClient<Department>({
    method: 'GET',
    endpoint: `/departments/${departmentId}`,
  });
  return department;
}
