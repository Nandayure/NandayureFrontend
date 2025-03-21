import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/services/routes';
import { FolderAPI } from '@/types';

/**
 * Obtiene una lista de carpetas por empleado.
 * 
 * @param {number} id - ID del empleado
 * @returns {Promise<FolderAPI.Responses.List>} Promesa que resuelve a la lista de carpetas del empleado
 */
export const fetchFilesByEmployee = async (
  id: number,
): Promise<FolderAPI.Responses.List> => {
  return await httpClient.get<FolderAPI.Responses.List>(ROUTES.GOOGLE_DRIVE.FILES_BY_EMPLOYEE(id));
};

/**
 * Obtiene la lista de mis carpetas.
 * 
 * @returns {Promise<FolderAPI.Responses.List>} Promesa que resuelve a la lista de mis carpetas
 */
export const fetchMyFolders = async (): Promise<FolderAPI.Responses.List> => {
  return await httpClient.get<FolderAPI.Responses.List>(ROUTES.GOOGLE_DRIVE.MY_FOLDERS);
};