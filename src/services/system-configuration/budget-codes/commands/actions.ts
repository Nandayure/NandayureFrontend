import { BudgetCode, PatchBudgetCode } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Propiedades para actualizar un código de presupuesto
 */
interface PatchBudgetCodeProps {
  /**
   * ID del código de presupuesto a actualizar
   */
  budgetCodeId: number;

  /**
   * Datos para actualizar el código de presupuesto
   */
  budgetCode: PatchBudgetCode;
}

/**
 * Crea un nuevo código de presupuesto
 * 
 * @param {BudgetCode} data - Datos del código de presupuesto a crear
 * @returns {Promise<BudgetCode>} Promesa que resuelve con el código de presupuesto creado
 */
export const postBudgetCode = async (data: BudgetCode): Promise<BudgetCode> => {
  return await httpClient.post<BudgetCode>(ROUTES.BUDGET_CODES.BASE, data);
};

/**
 * Actualiza un código de presupuesto existente
 * 
 * @param {PatchBudgetCodeProps} props - Propiedades para actualizar el código de presupuesto
 * @returns {Promise<BudgetCode>} Promesa que resuelve con el código de presupuesto actualizado
 */
export const patchBudgetCode = async ({
  budgetCodeId,
  budgetCode,
}: PatchBudgetCodeProps): Promise<BudgetCode> => {
  return await httpClient.patch<BudgetCode>(ROUTES.BUDGET_CODES.BY_ID(budgetCodeId), budgetCode);
};

/**
 * Elimina un código de presupuesto
 * 
 * @param {number} budgetCodeId - ID del código de presupuesto a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteBudgetCode = async (budgetCodeId: number): Promise<void> => {
  await httpClient.delete(ROUTES.BUDGET_CODES.BY_ID(budgetCodeId));
};