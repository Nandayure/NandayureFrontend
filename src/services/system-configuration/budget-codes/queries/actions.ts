import { BudgetCode } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';

/**
 * Obtiene todos los códigos de presupuesto
 * 
 * @returns {Promise<BudgetCode[]>} Promesa que resuelve con la lista de códigos de presupuesto
 */
export const getAllBudgetCodes = async (): Promise<BudgetCode[]> => {
  return await httpClient.get<BudgetCode[]>(ROUTES.BUDGET_CODES.BASE);
};

/**
 * Obtiene un código de presupuesto por su ID
 * 
 * @param {number} budgetCodeId - ID del código de presupuesto
 * @returns {Promise<BudgetCode>} Promesa que resuelve con el código de presupuesto solicitado
 */
export const getBudgetCodesById = async (budgetCodeId: number): Promise<BudgetCode> => {
  return await httpClient.get<BudgetCode>(ROUTES.BUDGET_CODES.BY_ID(budgetCodeId));
};