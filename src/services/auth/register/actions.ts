
import httpClient from '@/helpers/httpClient';
import { Employee } from '@/types';

export async function postEmployee(employee: Employee) {
  return httpClient({
    method: 'POST',
    endpoint: '/employees',
    data: employee,
  });
}
