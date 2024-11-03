import { Annuity, PatchAnnuityProps } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function postAnnuity(data: Partial<Annuity>) {
  return httpClient<Annuity>({
    method: 'POST',
    endpoint: '/annuities',
    data,
  });
}

export async function patchAnnuity({ annuityId, annuity }: PatchAnnuityProps) {
  return httpClient<Annuity>({
    method: 'PATCH',
    endpoint: `/annuities/${annuityId}`,
    data: annuity,
  });
}

export async function deleteAnnuity(annuityId: number) {
  return httpClient<void>({
    method: 'DELETE',
    endpoint: `/annuities/${annuityId}`,
  });
}
