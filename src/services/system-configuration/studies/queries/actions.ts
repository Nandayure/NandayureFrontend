import httpClient from '@/helpers/httpClient';
import { Study } from '@/types';

export async function getAllStudies() {
  const studies = await httpClient<Study[]>({
    method: 'GET',
    endpoint: '/studies',
  });
  return studies;
}

export async function getStudyById(studyId: number) {
  const study = await httpClient<Study>({
    method: 'GET',
    endpoint: `/studies/${studyId}`,
  });
  return study;
}
