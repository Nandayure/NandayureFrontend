
import httpClient from '@/helpers/httpClient';
import { Gender, PatchGender } from '@/types';

export async function postGender(data: Gender) {
  const gender = await httpClient<Gender>({
    method: 'POST',
    endpoint: '/genders',
    data,
  });
  return gender;
}

interface PatchGenderProps {
  genderId: number;
  gender: PatchGender;
}

export async function patchGender({
  genderId,
  gender,
}: PatchGenderProps) {
  const updatedGender = await httpClient<Gender>({
    method: 'PATCH',
    endpoint: `/genders/${genderId}`,
    data: gender,
  });
  return updatedGender;
}

export async function deleteGender(genderId: number) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/genders/${genderId}`,
  });
  return response;
}