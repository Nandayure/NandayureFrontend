import { GenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import { PatchGenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import httpClient from '@/helpers/httpClient';

export async function postGenderProgram(data: GenderProgram) {
  const genderProgram = await httpClient<GenderProgram>({
    method: 'POST',
    endpoint: '/gender-programs',
    data,
  });
  return genderProgram;
}

interface PatchGenderProgramProps {
  genderProgramId: number;
  gender: PatchGenderProgram;
}

export async function patchGenderProgram({
genderProgramId,
gender,
}: PatchGenderProgramProps) {
  const updatedGendertProgram = await httpClient<GenderProgram>({
    method: 'PATCH',
    endpoint: `/gender-programs/${genderProgramId}`,
    data: gender,
  });
  return updatedGendertProgram;
}

export async function deleteGenderProgram(genderProgramId: number) {
  const response = await httpClient<void>({
    method: 'DELETE',
    endpoint: `/gender-programs/${genderProgramId}`,
  });
  return response;
}