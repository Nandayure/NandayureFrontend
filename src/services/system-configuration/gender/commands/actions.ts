import { Gender, PatchGender } from '@/types';
import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';

/**
 * Propiedades para actualizar un género
 */
interface PatchGenderProps {
  /**
   * ID del género a actualizar
   */
  genderId: number;

  /**
   * Datos para actualizar el género
   */
  gender: PatchGender;
}

/**
 * Crea un nuevo género
 * 
 * @param {Gender} data - Datos del género a crear
 * @returns {Promise<Gender>} Promesa que resuelve con el género creado
 */
export const postGender = async (data: Gender): Promise<Gender> => {
  return await httpClient.post<Gender>(ROUTES.GENDERS.BASE, data);
};

/**
 * Actualiza un género existente
 * 
 * @param {PatchGenderProps} props - Propiedades para actualizar el género
 * @returns {Promise<Gender>} Promesa que resuelve con el género actualizado
 */
export const patchGender = async ({
  genderId,
  gender,
}: PatchGenderProps): Promise<Gender> => {
  return await httpClient.patch<Gender>(
    ROUTES.GENDERS.BY_ID(genderId),
    gender
  );
};

/**
 * Elimina un género
 * 
 * @param {number} genderId - ID del género a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteGender = async (genderId: number): Promise<void> => {
  await httpClient.delete(ROUTES.GENDERS.BY_ID(genderId));
};