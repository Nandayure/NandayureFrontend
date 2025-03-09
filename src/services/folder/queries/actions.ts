import httpClient from '@/helpers/httpClient';
import { FolderAPI } from '@/types';

const URL_BASE = '/google-drive-files';

/**
 * Función para obtener una lista de carpetas por empleado.
 */

export const fetchFilesByEmployee = async (
  id: number,
): Promise<FolderAPI.Responses.List> => {
  return await httpClient<FolderAPI.Responses.List>({
    method: 'GET',
    endpoint: `${URL_BASE}/FilesByEmployee/${id}`,
  });
};

/*
 * Función para obtener la lista de mis carpetas.
 */

export const fetchMyFolders = async (): Promise<FolderAPI.Responses.List> => {
  return await httpClient<FolderAPI.Responses.List>({
    method: 'GET',
    endpoint: `${URL_BASE}/MyFolders`,
  });
};
