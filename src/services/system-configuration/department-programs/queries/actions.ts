import { DepartmentProgram } from '@/types';

export async function getAllDepartmentPrograms() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/department-programs`,
    options,
  );
  const data = (await res.json()) as DepartmentProgram[];
  return data;
}

export async function getByIdDepartmentProgram(departmentProgramId: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/department-programs/${departmentProgramId}`,
    options,
  );
  const data = (await res.json()) as DepartmentProgram;
  return data;
}
