import { Department } from '@/types';

export async function postDepartament(data: Department) {
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
  return response;
}

export async function patchDepartament(departmentId: number, data: Department) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments/${departmentId}`,
    options,
  );
  const response = await res.json();
  return response;
}

export async function deleteDepartament(departmentId: number) {
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
  return response;
}
