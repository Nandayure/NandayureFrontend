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
