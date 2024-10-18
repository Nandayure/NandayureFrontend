import httpClient from '@/helpers/httpClient';
import { StudiesCategory } from '@/types';

export async function getAllStudiesCategories() {
  const studiesCategories = await httpClient<StudiesCategory[]>({
    method: 'GET',
    endpoint: '/studies-category',
  });
  return studiesCategories;
}

export async function getStudiesCategoryById(studiesCategoryId: number) {
  const studiesCategory = await httpClient<StudiesCategory>({
    method: 'GET',
    endpoint: `/studies-category/${studiesCategoryId}`,
  });
  return studiesCategory;
}
