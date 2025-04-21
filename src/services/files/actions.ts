import httpClient from '@/helpers/http-client';
import { ROUTES } from '@/constants/api-routes/routes';
import { PdfFile, PaginatedFilesResponse } from '@/types/files/file';
import { GetFilesFilterDto } from '@/types/files/filterTypes.d';

/**
 * Interfaz para las propiedades de carga de un documento
 */
interface UploadDocumentProps {
  /**
   * ID de la carpeta de destino
   */
  FolderId: string;

  /**
   * Nombre del archivo
   */
  FileName: string;

  /**
   * Archivo a subir
   */
  file: File;
}

/**
 * Obtiene los archivos del usuario en una carpeta específica
 * 
 * @param {string} id - ID de la carpeta
 * @param {GetFilesFilterDto} filters - Filtros para la búsqueda de archivos
 * @returns {Promise<PaginatedFilesResponse>} Promesa que resuelve a la lista paginada de archivos PDF del usuario
 */
export const getUserFiles = async (id: string, filters?: GetFilesFilterDto): Promise<PaginatedFilesResponse> => {
  const response = await httpClient.get<PaginatedFilesResponse>(ROUTES.GOOGLE_DRIVE.USER_FILES(id), { params: filters });
  return {
    ...response,
    data: response.data || []
  };
};

/**
 * Obtiene los archivos de un empleado en una carpeta específica
 * 
 * @param {string} id - ID de la carpeta
 * @param {GetFilesFilterDto} filters - Filtros para la búsqueda de archivos
 * @returns {Promise<PaginatedFilesResponse>} Promesa que resuelve a la lista paginada de archivos PDF del empleado
 */
export const getEmployeeFiles = async (id: string, filters?: GetFilesFilterDto): Promise<PaginatedFilesResponse> => {
  const response = await httpClient.get<PaginatedFilesResponse>(ROUTES.GOOGLE_DRIVE.EMPLOYEE_FILES(id), { params: filters });
  return {
    ...response,
    data: response.data || []
  };
};

/**
 * Obtiene la URL de visualización de un archivo
 * 
 * @param {string} fileId - ID del archivo
 * @returns {Promise<Blob>} Promesa que resuelve al contenido del archivo como Blob
 */
export const getFileViewUrl = async (fileId: string): Promise<Blob> => {
  return await httpClient.get<Blob>(ROUTES.GOOGLE_DRIVE.FILE_VIEW(fileId), {
    headers: {
      Accept: 'application/pdf,application/octet-stream,*/*',
    },
  });
};

/**
 * Sube un documento a una carpeta específica
 * 
 * @param {UploadDocumentProps} props - Propiedades del documento a subir
 * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor
 */
export const uploadDocument = async ({
  FolderId,
  FileName,
  file,
}: UploadDocumentProps): Promise<any> => {
  const formData = new FormData();
  formData.append('FolderId', FolderId);
  formData.append('FileName', FileName);
  formData.append('file', file);

  return await httpClient.post<any>(ROUTES.GOOGLE_DRIVE.UPLOAD, formData, {
    timeout: 60000,
  });
};

/**
 * Elimina un archivo específico
 * 
 * @param {string} fileId - ID del archivo a eliminar
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la eliminación
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  await httpClient.delete(ROUTES.GOOGLE_DRIVE.DELETE(fileId));
};