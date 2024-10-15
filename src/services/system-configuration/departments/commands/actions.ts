import { inter } from '@/config/fonts';
import { Department, PatchDepartment } from '@/types';

export async function postDepartment(data: Department) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}

interface PatchDepartmentProps {
  departmentId: number;
  department: PatchDepartment;
}

export async function patchDepartment({
  departmentId,
  department,
}: PatchDepartmentProps) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(department),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments/${departmentId}`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}

export async function deleteDepartment(departmentId: number) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments/${departmentId}`,
    options,
  );
  const response = await res.json();
  if (!res.ok) {
    throw new Error(response.message);
  }
  return response;
}
