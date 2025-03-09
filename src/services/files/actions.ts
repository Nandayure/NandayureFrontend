import httpClient from '@/helpers/httpClient';
import { PdfFile } from '@/types';

export async function getUserFiles(id: string): Promise<PdfFile[]> {
  return httpClient<PdfFile[]>({
    method: 'GET',
    endpoint: `/google-drive-files/MyFilesByFolder/${id}`,
  });
}

export async function getEmployeeFiles(id: string): Promise<PdfFile[]> {
  return httpClient<PdfFile[]>({
    method: 'GET',
    endpoint: `/google-drive-files/FilesByFolder/${id}`,
  });
}

export async function getFileViewUrl(fileId: string): Promise<Blob> {
  return httpClient<Blob>({
    method: 'GET',
    endpoint: `/google-drive-files/getFile/${fileId}`,
    headers: {
      Accept: 'application/pdf,application/octet-stream,*/*',
    },
  });
}

// Interfaz actualizada
interface UploadDocumentProps {
  FolderId: string; // Cambiado de EmployeeId a FolderId
  FileName: string;
  file: File;
}

export async function uploadDocument({
  FolderId, 
  FileName,
  file,
}: UploadDocumentProps) {
  const formData = new FormData();
  formData.append('FolderId', FolderId); 
  formData.append('FileName', FileName);
  formData.append('file', file);

  const response = await httpClient<any>({
    method: 'POST',
    endpoint: '/google-drive-files/upload',
    data: formData,
  });

  return response;
}

export async function deleteFile(fileId: string): Promise<void> {
  return httpClient<void>({
    method: 'DELETE',
    endpoint: `/google-drive-files/deleteFile/${fileId}`,
  });
}