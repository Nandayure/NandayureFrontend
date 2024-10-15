import { Department } from "@/types";

export async function getAllDepartments() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments`,
    options,
  );
  const data = (await res.json()) as Department[];
  return data;
}

export async function getDepartmentById(departmentId: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/departments/${departmentId}`,
    options,
  );
  const data = (await res.json()) as Department;
  return data;
}
