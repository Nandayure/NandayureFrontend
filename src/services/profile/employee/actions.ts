import httpClient from '@/helpers/httpClient';
import { Employee, UpdateEmployee } from '@/types';

interface GetEmployeeByIdProps {
  employeeId: number;
}

export async function getByIdEmployee({
  employeeId,
}: GetEmployeeByIdProps): Promise<Employee> {
  return httpClient<Employee>({
    method: 'GET',
    endpoint: `/employees/${employeeId}`,
  });
}

interface UpdateEmployeeProps {
  employeeId: number;
  employee: UpdateEmployee;
}

export async function updateEmployee({
  employeeId,
  employee,
}: UpdateEmployeeProps): Promise<UpdateEmployee> {
  return httpClient<UpdateEmployee>({
    method: 'PATCH',
    endpoint: `/employees/${employeeId}`,
    data: employee,
  });
}
