import httpClient from '@/helpers/httpClient';
import { RequestPaySlip } from '@/types';

export async function getPaySlip() {
  return httpClient({
    method: 'GET',
    endpoint: '/request-payment-confirmations',
  });
}

export async function postPaySlip(paySlip: RequestPaySlip) {
  return httpClient({
    method: 'POST',
    endpoint: '/request-payment-confirmations',
    data: paySlip,
  });
}
