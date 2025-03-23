import { TypeFinancialInstitutions, PatchTypeFinancialInstitutions } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Crea un nuevo tipo de institución financiera
 * 
 * @param {TypeFinancialInstitutions} typeFinancialInstitutions - Datos del tipo de institución financiera a crear
 * @returns {Promise<TypeFinancialInstitutions>} Promesa que resuelve con el tipo de institución financiera creado
 */
export const postTypeFinancialInstitutions = async (
  typeFinancialInstitutions: TypeFinancialInstitutions
): Promise<TypeFinancialInstitutions> => {
  return await httpClient.post<TypeFinancialInstitutions>(
    ROUTES.TYPE_FINANCIAL_INSTITUTIONS.BASE,
    typeFinancialInstitutions
  );
};

/**
 * Actualiza un tipo de institución financiera existente
 * 
 * @param {number} typeFinancialInstitutionsId - ID del tipo de institución financiera a actualizar
 * @param {PatchTypeFinancialInstitutions} typeFinancialInstitutions - Datos para actualizar el tipo de institución financiera
 * @returns {Promise<TypeFinancialInstitutions>} Promesa que resuelve con el tipo de institución financiera actualizado
 */
export const patchTypeFinancialInstitutions = async (
  typeFinancialInstitutionsId: number,
  typeFinancialInstitutions: PatchTypeFinancialInstitutions
): Promise<TypeFinancialInstitutions> => {
  return await httpClient.patch<TypeFinancialInstitutions>(
    ROUTES.TYPE_FINANCIAL_INSTITUTIONS.BY_ID(typeFinancialInstitutionsId),
    typeFinancialInstitutions
  );
};

/**
 * Elimina un tipo de institución financiera
 * 
 * @param {number} typeFinancialInstitutionsId - ID del tipo de institución financiera a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteTypeFinancialInstitutions = async (
  typeFinancialInstitutionsId: number
): Promise<void> => {
  await httpClient.delete(
    ROUTES.TYPE_FINANCIAL_INSTITUTIONS.BY_ID(typeFinancialInstitutionsId)
  );
};