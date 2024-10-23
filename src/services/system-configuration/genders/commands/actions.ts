import httpClient from '@/helpers/httpClient';
import { Gender } from '@/types';
import { PatchGender } from '@/types/system-configuration/Gender/gender';

export async function postGender(data: Gender) {
    const Gender = await httpClient<Gender>({
        method: 'POST',
        endpoint: '/genders',
        data,
      });
      return Gender;
    }
    
interface PatchGenderProps{
    GenderId: number;
    Gender: PatchGender;

}
export async function patchGender({
    GenderId,
    Gender,
}: PatchGenderProps) {
    const updatedGender = await httpClient<Gender>({
      method: 'PATCH',
      endpoint: `/genders/${GenderId}`,
      data: Gender,
    });
    return updatedGender;
}


export async function deleteGender(GenderId: number) {
    const response = await httpClient<void>({
        method: 'DELETE',
        endpoint: `/genders/${GenderId}`,
      });
      return response;
}

