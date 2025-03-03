import httpClient from '@/helpers/httpClient';
import { ChangePassword } from '@/types';

export async function postChangePassword(resetPassword: ChangePassword) {
  return httpClient({
    method: 'POST',
    endpoint: '/auth/change-password',
    data: {
      oldPassword: resetPassword.OldPassword,
      newPassword: resetPassword.Password,
    },
  });
}
