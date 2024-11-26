
import httpClient from '@/helpers/httpClient';
import {
  TypeFinancialInstitutions,
  PatchTypeFinancialInstitutions,
} from '@/types';

export async function postTypeFinancialInstitutions(
  typeFinancialInstitutions: TypeFinancialInstitutions,
) {
  const response = await httpClient<TypeFinancialInstitutions>({
    method: 'POST',
    endpoint: '/type-financial-institutions',
    data: typeFinancialInstitutions,
  });
  return response;
}

interface PatchTypeFinancialInstitutionsProps {
  typeFinancialInstitutionsId: number;
  typeFinancialInstitutions: PatchTypeFinancialInstitutions;
}

export async function patchTypeFinancialInstitutions({
  typeFinancialInstitutionsId,
  typeFinancialInstitutions,
}: PatchTypeFinancialInstitutionsProps) {
  const response = await httpClient<TypeFinancialInstitutions>({
    method: 'PATCH',
    endpoint: `/type-financial-institutions/${typeFinancialInstitutionsId}`,
    data: typeFinancialInstitutions,
  });
  return response;
}

export async function deleteTypeFinancialInstitutions(
  typeFinancialInstitutionsId: number,
) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/type-financial-institutions/${typeFinancialInstitutionsId}`,
  });
  return response;
}
