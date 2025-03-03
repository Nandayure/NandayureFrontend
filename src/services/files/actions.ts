import httpClient from '@/helpers/httpClient';
import { PdfFile } from '@/types';

export async function getUserFiles(): Promise<PdfFile[]> {
  return httpClient<PdfFile[]>({
    method: 'GET',
    endpoint: '/google-drive-files/MyFiles',
  });
}
