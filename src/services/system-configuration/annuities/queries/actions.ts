// src/services/index.ts

import { Annuity, AnnuityEmployee } from '@/types';
import httpClient from '@/helpers/httpClient';

export async function getAllAnnuities() {
  return httpClient<Annuity[]>({
    method: 'GET',
    endpoint: '/annuities',
  });
}

export async function getAnnuityById(annuityId: number) {
  return httpClient<Annuity>({
    method: 'GET',
    endpoint: `/annuities/${annuityId}`,
  });
}

export async function getEmployees() {
  return httpClient<AnnuityEmployee[]>({
    method: 'GET',
    endpoint: '/employees',
  });
}

