import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { Gender } from '@/types';

/**
 * Obtiene todos los géneros
 * 
 * @returns {Promise<Gender[]>} Promesa que resuelve con la lista de géneros
 */
export const getAllGenders = async (): Promise<Gender[]> => {
  return await httpClient.get<Gender[]>(ROUTES.GENDERS.BASE);
};

/**
 * Obtiene un género por su ID
 * 
 * @param {number} genderId - ID del género
 * @returns {Promise<Gender>} Promesa que resuelve con el género solicitado
 */
export const getGenderById = async (genderId: number): Promise<Gender> => {
  return await httpClient.get<Gender>(ROUTES.GENDERS.BY_ID(genderId));
};