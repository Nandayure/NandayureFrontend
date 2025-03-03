import httpClient from '@/helpers/httpClient';
import { RequestVacation } from '@/types';

export async function postVacation(vacation: RequestVacation) {
  return httpClient({
    method: 'POST',
    endpoint: '/request-vacation',
    data: vacation,
  });
}

export async function getVacation() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-vacation',
  });
}
