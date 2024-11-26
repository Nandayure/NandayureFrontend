import httpClient from '@/helpers/httpClient';
import { FinancialInstitutions, PatchFinancialInstitutions } from '@/types';

export async function postFinancialInstitutions(
  financialInstitutions: FinancialInstitutions,
) {
  const response = await httpClient<FinancialInstitutions>({
    method: 'POST',
    endpoint: '/financial-institutions',
    data: financialInstitutions,
  });
  return response;
}

interface PatchFinancialInstitutionsProps {
  financialInstitutionsId: number;
  financialInstitutions: PatchFinancialInstitutions;
}

export async function patchFinancialInstitutions({
  financialInstitutionsId,
  financialInstitutions,
}: PatchFinancialInstitutionsProps) {
  const response = await httpClient<FinancialInstitutions>({
    method: 'PATCH',
    endpoint: `/financial-institutions/${financialInstitutionsId}`,
    data: financialInstitutions,
  });
  return response;
}

export async function deleteFinancialInstitutions(
  financialInstitutionsId: number,
) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/financial-institutions/${financialInstitutionsId}`,
  });
  return response;
}
