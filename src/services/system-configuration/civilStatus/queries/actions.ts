import httpClient from "@/helpers/httpClient";
import { CivilStatus } from "@/types";


export async function getAllCivilStatus() {
    const civilStatus = await httpClient<CivilStatus[]>({
      method: "GET",
      endpoint: "/marital-status",
    });
    return civilStatus;
  }
  
  export async function getCivilStatusById(civilStatusId: number) {
    const civilStatus = await httpClient<CivilStatus>({
      method: 'GET',
      endpoint: `/marital-status/${civilStatusId}`,
    });
    return civilStatus;
  }