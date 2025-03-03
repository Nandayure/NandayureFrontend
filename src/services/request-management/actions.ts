import httpClient from '@/helpers/httpClient';
import { CurrentToApprove } from '@/types';
import { RequestDetails } from '@/types/request-management/commonTypes';

export async function getAllRequests() {
  return httpClient<RequestDetails[]>({
    method: 'GET',
    endpoint: '/requests',
  });
}

export async function getAllRequestsById(employeeId: number) {
  return httpClient<RequestDetails[]>({
    method: 'GET',
    endpoint: `/requests/${employeeId}`,
  });
}

export async function getCurrentToApprove() {
  return httpClient<CurrentToApprove[]>({
    method: 'GET',
    endpoint: '/request-approvals/currentToApprove',
  });
}

export async function patchRequestApproval(
  id: number,
  data: { approved: boolean; observation: string },
) {
  return httpClient({
    method: 'PATCH',
    endpoint: `/request-approvals/${id}`,
    data,
  });
}
