import httpClient from '@/helpers/httpClient';
import { Studies } from '@/types';

export async function getAllStudies() {
  const studies = await httpClient<Studies[]>({
    method: 'GET',
    endpoint: '/studies',
  });
  return studies;
}

export async function getStudyById(studyId: number) {
  const study = await httpClient<Studies>({
    method: 'GET',
    endpoint: `/studies/${studyId}`,
  });
  return study;
}
