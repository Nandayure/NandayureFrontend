import { TypeFinancialInstitutions } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Obtiene todos los tipos de instituciones financieras
 * 
 * @returns {Promise<TypeFinancialInstitutions[]>} Promesa que resuelve con todos los tipos de instituciones financieras
 */
export const getAllTypeFinancialInstitutions = async (): Promise<TypeFinancialInstitutions[]> => {
  return await httpClient.get<TypeFinancialInstitutions[]>(
    ROUTES.TYPE_FINANCIAL_INSTITUTIONS.BASE
  );
};

/**
 * Obtiene un tipo de institución financiera específico por su ID
 * 
 * @param {number} typeFinancialInstitutionId - ID del tipo de institución financiera a obtener
 * @returns {Promise<TypeFinancialInstitutions>} Promesa que resuelve con el tipo de institución financiera solicitado
 */
export const getTypeFinancialInstitutionById = async (
  typeFinancialInstitutionId: number
): Promise<TypeFinancialInstitutions> => {
  return await httpClient.get<TypeFinancialInstitutions>(
    ROUTES.TYPE_FINANCIAL_INSTITUTIONS.BY_ID(typeFinancialInstitutionId)
  );
};