import httpClient from '@/helpers/httpClient';

interface UploadDocumentProps {
  EmployeeId: string;
  FileName: string; // pay-slip, salary-certificate, request-vacations
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
