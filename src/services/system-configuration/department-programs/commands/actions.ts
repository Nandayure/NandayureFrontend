import { DepartmentProgram } from '@/types';

export async function postDepartmentProgram(data: DepartmentProgram) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/department-programs`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}

interface PatchDepartmentProgramProps {
  departmentProgramId: number;
  department: DepartmentProgram;
}

export async function patchDepartmentProgram({
  departmentProgramId,
  department,
}: PatchDepartmentProgramProps) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(department),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/department-programs/${departmentProgramId}`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}

export async function deleteDepartmentProgram(departmentProgramId: number) {
  const options = {
    method: 'DELETE',
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/department-programs/${departmentProgramId}`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}