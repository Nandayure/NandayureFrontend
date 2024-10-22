import { GenderProgram } from '@/types/system-configuration/Gender-programs/gender-programs';
import httpClient from '@/helpers/httpClient';

export async function getAllGenderPrograms() {
  const genderPrograms = await httpClient<GenderProgram[]>({
    method: 'GET',
    endpoint: '/gender-programs',
  });
  return genderPrograms;
}

export async function getGenderById(genderProgramId: number) {
  const GenderProgram = await httpClient<GenderProgram>({
    method: 'GET',
    endpoint: `/gender-programs/${genderProgramId}`,
  });
  return GenderProgram;
}