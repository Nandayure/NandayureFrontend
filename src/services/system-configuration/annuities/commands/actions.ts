import { Annuity, PatchAnnuityProps } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Crea una nueva anualidad
 * 
 * @param {Partial<Annuity>} data - Datos parciales de la anualidad a crear
 * @returns {Promise<Annuity>} Promesa que resuelve con la anualidad creada
 */
export const postAnnuity = async (data: Partial<Annuity>): Promise<Annuity> => {
  return await httpClient.post<Annuity>(ROUTES.ANNUITIES.BASE, data);
};

/**
 * Actualiza una anualidad existente
 * 
 * @param {PatchAnnuityProps} props - Propiedades para actualizar la anualidad
 * @param {number} props.annuityId - ID de la anualidad a actualizar
 * @param {Partial<Annuity>} props.annuity - Datos a actualizar de la anualidad
 * @returns {Promise<Annuity>} Promesa que resuelve con la anualidad actualizada
 */
export const patchAnnuity = async ({ annuityId, annuity }: PatchAnnuityProps): Promise<Annuity> => {
  return await httpClient.patch<Annuity>(ROUTES.ANNUITIES.BY_ID(annuityId), annuity);
};

/**
 * Elimina una anualidad
 * 
 * @param {number} annuityId - ID de la anualidad a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteAnnuity = async (annuityId: number): Promise<void> => {
  await httpClient.delete(ROUTES.ANNUITIES.BY_ID(annuityId));
};