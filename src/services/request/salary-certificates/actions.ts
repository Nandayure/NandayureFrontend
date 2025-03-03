import httpClient from '@/helpers/httpClient';
import { RequestSalaryCertificate } from '@/types';

export async function getSalaryCertificates() {
  return httpClient({
    method: 'GET',
    endpoint: '/salary-certificates',
  });
}

export async function postSalaryCertificates(
  salaryCertificate: RequestSalaryCertificate,
) {
  return httpClient({
    method: 'POST',
    endpoint: '/request-salary-certificates',
    data: salaryCertificate,
  });
}
