import { Annuity, AnnuityEmployee } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';

/**
 * Obtiene todas las anualidades
 * 
 * @returns {Promise<Annuity[]>} Promesa que resuelve con la lista de anualidades
 */
export const getAllAnnuities = async (): Promise<Annuity[]> => {
  return await httpClient.get<Annuity[]>(ROUTES.ANNUITIES.BASE);
};

/**
 * Obtiene una anualidad por su ID
 * 
 * @param {number} annuityId - ID de la anualidad
 * @returns {Promise<Annuity>} Promesa que resuelve con la anualidad solicitada
 */
export const getAnnuityById = async (annuityId: number): Promise<Annuity> => {
  return await httpClient.get<Annuity>(ROUTES.ANNUITIES.BY_ID(annuityId));
};
