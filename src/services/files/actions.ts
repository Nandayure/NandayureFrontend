import httpClient from '@/helpers/httpClient';
import { EmployeeFile, PdfFile } from '@/types';

export async function getUserFiles(): Promise<PdfFile[]> {
  return httpClient<PdfFile[]>({
    method: 'GET',
    endpoint: '/google-drive-files/MyFiles',
  });
}

export async function getEmployeeFiles(
  employeeId: string,
): Promise<EmployeeFile[]> {
  return httpClient<EmployeeFile[]>({
    method: 'GET',
    endpoint: `/google-drive-files/FilesByEmployee/${employeeId}`,
  });
}

export function getFileViewUrl(fileId: string): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/google-drive-files/getFile/${fileId}`;
}

interface UploadDocumentProps {
  EmployeeId: string;
  FileName: string;
  file: File;
}

export async function uploadDocument({
  EmployeeId,
  FileName,
  file,
}: UploadDocumentProps) {
  const formData = new FormData();
  formData.append('EmployeeId', EmployeeId);
  formData.append('FileName', FileName);
  formData.append('file', file);

  const response = await httpClient<any>({
    method: 'POST',
    endpoint: '/google-drive-files/upload',
    data: formData,
  });

  return response;
}
