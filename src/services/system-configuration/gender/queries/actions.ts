import httpClient from '@/helpers/httpClient';
import { Gender } from '@/types';

export async function getAllGenders() {
  const genders = await httpClient<Gender[]>({
    method: 'GET',
    endpoint: '/genders',
  });
  return genders;
}

export async function getGenderById(genderId: number) {
  const gender = await httpClient<Gender>({
    method: 'GET',
    endpoint: `/genders/${genderId}`,
  });
  return gender;
}
