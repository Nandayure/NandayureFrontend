import { Department, PatchDepartment } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function postDepartment(data: Department) {
  const department = await httpClient<Department>({
    method: 'POST',
    endpoint: '/departments',
    data,
  });
  return department;
}

interface PatchDepartmentProps {
  departmentId: number;
  department: PatchDepartment;
}

export async function patchDepartment({
  departmentId,
  department,
}: PatchDepartmentProps) {
  const updatedDepartment = await httpClient<Department>({
    method: 'PATCH',
    endpoint: `/departments/${departmentId}`,
    data: department,
  });
  return updatedDepartment;
}

export async function deleteDepartment(departmentId: number) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/departments/${departmentId}`,
  });
  return response;
}
