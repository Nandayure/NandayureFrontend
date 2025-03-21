import { Annuity, AnnuityEmployee } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';

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

/**
 * Obtiene la lista de empleados
 * 
 * @returns {Promise<AnnuityEmployee[]>} Promesa que resuelve con la lista de empleados
 */
export const getEmployees = async (): Promise<AnnuityEmployee[]> => {
  return await httpClient.get<AnnuityEmployee[]>(ROUTES.ANNUITIES.EMPLOYEES);
};