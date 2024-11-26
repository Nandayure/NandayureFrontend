import httpClient from '@/helpers/httpClient';
import { CivilStatus, PatchCivilStatus } from '@/types';

export async function postCivilStatus(data: CivilStatus) {
    const civilStatus = await httpClient<CivilStatus>({
        method: 'POST',
        endpoint: '/marital-status',
        data,
      });
      return civilStatus;
    }
    
interface PatchCivilStatusProps{
    civilStatusId: number;
    civilStatus: PatchCivilStatus;

}
export async function patchCivilStatus({
    civilStatusId,
    civilStatus,
}: PatchCivilStatusProps) {
    const updatedCivilStatus = await httpClient<CivilStatus>({
      method: 'PATCH',
      endpoint: `/marital-status/${civilStatusId}`,
      data: civilStatus,
    });
    return updatedCivilStatus;
}


export async function deleteCivilStatus(civilStatusId: number) {
    const response = await httpClient<void>({
        method: 'DELETE',
        endpoint: `/marital-status/${civilStatusId}`,
      });
      return response;
}

