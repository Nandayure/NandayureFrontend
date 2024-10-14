import { Employee, UpdateEmployee } from '@/types';

interface GetEmployeeByIdProps {
  employeeId: number;
}

export async function getByIdEmployee({ employeeId }: GetEmployeeByIdProps) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employeeId}`,
    options,
  );
  const data = (await res.json()) as Employee;
  return data;
}

interface UpdateEmployeeProps {
  employeeId: number;
  employee: UpdateEmployee;
}

export async function updateEmployee({
  employeeId,
  employee,
}: UpdateEmployeeProps) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employeeId}`,
    options,
  );
  const data = (await res.json()) as UpdateEmployee;
  return data;
}
