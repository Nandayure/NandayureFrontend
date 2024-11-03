import httpClient from '@/helpers/httpClient';
import { TypeFinancialInstitutions } from '@/types';

export async function getAllTypeFinancialInstitutions() {
  const response = await httpClient<TypeFinancialInstitutions[]>({
    method: 'GET',
    endpoint: '/type-financial-institutions',
  });
  return response;
}

export async function getTypeFinancialInstitutionById(
  typeFinancialInstitutionId: number,
) {
  const response = await httpClient<TypeFinancialInstitutions>({
    method: 'GET',
    endpoint: `/type-financial-institutions/${typeFinancialInstitutionId}`,
  });
  return response;
}
