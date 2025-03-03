import httpClient from '@/helpers/httpClient';
import { ForgotPassword } from '@/types';

export async function postForgotPassword(email: ForgotPassword) {
  return httpClient({
    method: 'POST',
    endpoint: '/auth/forgot-password',
    data: email,
    sendToken: false,
  });
}
