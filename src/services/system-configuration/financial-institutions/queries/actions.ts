import httpClient from '@/helpers/httpClient';
import { FinancialInstitutions } from '@/types';

export async function getAllFinancialInstitutions() {
  const FinancialInstitutions = await httpClient<FinancialInstitutions[]>({
    method: 'GET',
    endpoint: '/financial-institutions',
  });
  return FinancialInstitutions;
}

export async function getFinancialInstitutionById(
  financialInstitutionId: number,
) {
  const FinancialInstitution = await httpClient<FinancialInstitutions>({
    method: 'GET',
    endpoint: `/financial-institutions/${financialInstitutionId}`,
  });
  return FinancialInstitution;
}
