import { BudgetCode } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function getAllBudgetCodes() {
  const budgetCodes = await httpClient<BudgetCode[]>({
    method: 'GET',
    endpoint: '/budget-codes',
  });
  return budgetCodes;
}

export async function getBudgetCodesById(budgetCodeId: number) {
  const budgetCode = await httpClient<BudgetCode>({
    method: 'GET',
    endpoint: `/budget-codes/${budgetCodeId}`,
  });
  return budgetCode;
}
