import { DepartmentProgram } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function getAllDepartmentPrograms() {
  const departmentPrograms = await httpClient<DepartmentProgram[]>({
    method: 'GET',
    endpoint: '/department-programs',
  });
  return departmentPrograms;
}

export async function getDepartmentProgramById(departmentProgramId: number) {
  const departmentProgram = await httpClient<DepartmentProgram>({
    method: 'GET',
    endpoint: `/department-programs/${departmentProgramId}`,
  });
  return departmentProgram;
}