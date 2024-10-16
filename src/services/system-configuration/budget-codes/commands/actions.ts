import { BudgetCode, PatchBudgetCode } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function postBudgetCode(data: BudgetCode) {
  const budgetCode = await httpClient<BudgetCode>({
    method: 'POST',
    endpoint: '/budget-codes',
    data,
  });
  return budgetCode;
}

interface PatchBudgetCodeProps {
  budgetCodeId: number;
  budgetCode: PatchBudgetCode;
}

export async function patchBudgetCode({
  budgetCodeId,
  budgetCode,
}: PatchBudgetCodeProps) {
  const updatedBudgetCode = await httpClient<BudgetCode>({
    method: 'PATCH',
    endpoint: `/budget-codes/${budgetCodeId}`,
    data: budgetCode,
  });
  return updatedBudgetCode;
}

export async function deleteBudgetCode(budgetCodeId: number) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/budget-codes/${budgetCodeId}`,
  });
  return response;
}
