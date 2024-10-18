import httpClient from '@/helpers/httpClient';
import { Studies, PatchStudies } from '@/types';

export async function postStudy(study: Studies) {
  const response = await httpClient<Studies>({
    method: 'POST',
    endpoint: '/studies',
    data: study,
  });
  return response;
}

export async function patchStudy(studyId: number, study: PatchStudies) {
  const response = await httpClient<PatchStudies>({
    method: 'PATCH',
    endpoint: `/studies/${studyId}`,
    data: study,
  });
  return response;
}

export async function deleteStudy(studyId: number) {
  const response = await httpClient<Studies>({
    method: 'DELETE',
    endpoint: `/studies/${studyId}`,
  });
  return response;
}
