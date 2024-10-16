import { DepartmentProgram, PatchDepartmentProgram } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function postDepartmentProgram(data: DepartmentProgram) {
  const departmentProgram = await httpClient<DepartmentProgram>({
    method: 'POST',
    endpoint: '/department-programs',
    data,
  });
  return departmentProgram;
}

interface PatchDepartmentProgramProps {
  departmentProgramId: number;
  department: PatchDepartmentProgram;
}

export async function patchDepartmentProgram({
  departmentProgramId,
  department,
}: PatchDepartmentProgramProps) {
  const updatedDepartmentProgram = await httpClient<DepartmentProgram>({
    method: 'PATCH',
    endpoint: `/department-programs/${departmentProgramId}`,
    data: department,
  });
  return updatedDepartmentProgram;
}

export async function deleteDepartmentProgram(departmentProgramId: number) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/department-programs/${departmentProgramId}`,
  });
  return response;
}