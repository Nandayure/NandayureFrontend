import httpClient from '@/helpers/httpClient';
import { PatchStudy, Study } from '@/types';

export async function postStudy(study: Study) {
  const response = await httpClient<Study>({
    method: 'POST',
    endpoint: '/studies',
    data: study,
  });
  return response;
}

export async function patchStudy(studyId: number, study: PatchStudy) {
  const response = await httpClient<PatchStudy>({
    method: 'PATCH',
    endpoint: `/studies/${studyId}`,
    data: study,
  });
  return response;
}

export async function deleteStudy(studyId: number) {
  const response = await httpClient<Study>({
    method: 'DELETE',
    endpoint: `/studies/${studyId}`,
  });
  return response;
}
