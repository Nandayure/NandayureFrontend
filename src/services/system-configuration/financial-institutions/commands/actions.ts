import { FinancialInstitutions, PatchFinancialInstitutions } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Propiedades para actualizar una institución financiera
 */
interface PatchFinancialInstitutionsProps {
  /**
   * ID de la institución financiera a actualizar
   */
  financialInstitutionsId: number;

  /**
   * Datos para actualizar la institución financiera
   */
  financialInstitutions: PatchFinancialInstitutions;
}

/**
 * Crea una nueva institución financiera
 * 
 * @param {FinancialInstitutions} financialInstitutions - Datos de la institución financiera a crear
 * @returns {Promise<FinancialInstitutions>} Promesa que resuelve con la institución financiera creada
 */
export const postFinancialInstitutions = async (
  financialInstitutions: FinancialInstitutions,
): Promise<FinancialInstitutions> => {
  return await httpClient.post<FinancialInstitutions>(
    ROUTES.FINANCIAL_INSTITUTIONS.BASE,
    financialInstitutions
  );
};

/**
 * Actualiza una institución financiera existente
 * 
 * @param {PatchFinancialInstitutionsProps} props - Propiedades para actualizar la institución financiera
 * @returns {Promise<FinancialInstitutions>} Promesa que resuelve con la institución financiera actualizada
 */
export const patchFinancialInstitutions = async ({
  financialInstitutionsId,
  financialInstitutions,
}: PatchFinancialInstitutionsProps): Promise<FinancialInstitutions> => {
  return await httpClient.patch<FinancialInstitutions>(
    ROUTES.FINANCIAL_INSTITUTIONS.BY_ID(financialInstitutionsId),
    financialInstitutions
  );
};

/**
 * Elimina una institución financiera
 * 
 * @param {number} financialInstitutionsId - ID de la institución financiera a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteFinancialInstitutions = async (
  financialInstitutionsId: number,
): Promise<void> => {
  await httpClient.delete(ROUTES.FINANCIAL_INSTITUTIONS.BY_ID(financialInstitutionsId));
};