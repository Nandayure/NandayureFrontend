import httpClient from '@/helpers/httpClient';
import { Employee } from '@/types';

export async function getAllEmployees() {
  const Employees = await httpClient<Employee[]>({
    method: 'GET',
    endpoint: '/employees',
  });
  return Employees;
}
