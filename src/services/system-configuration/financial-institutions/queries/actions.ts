import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { FinancialInstitutions } from '@/types';

/**
 * Obtiene todas las instituciones financieras
 * 
 * @returns {Promise<FinancialInstitutions[]>} Promesa que resuelve con la lista de instituciones financieras
 */
export const getAllFinancialInstitutions = async (): Promise<FinancialInstitutions[]> => {
  return await httpClient.get<FinancialInstitutions[]>(ROUTES.FINANCIAL_INSTITUTIONS.BASE);
};

/**
 * Obtiene una institución financiera por su ID
 * 
 * @param {number} financialInstitutionId - ID de la institución financiera
 * @returns {Promise<FinancialInstitutions>} Promesa que resuelve con la institución financiera solicitada
 */
export const getFinancialInstitutionById = async (
  financialInstitutionId: number,
): Promise<FinancialInstitutions> => {
  return await httpClient.get<FinancialInstitutions>(ROUTES.FINANCIAL_INSTITUTIONS.BY_ID(financialInstitutionId));
};