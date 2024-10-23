import httpClient from "@/helpers/httpClient";
import { Gender } from "@/types";


export async function getAllGender() {
    const Gender = await httpClient<Gender[]>({
      method: "GET",
      endpoint: "/genders",
    });
    return Gender;
  }
  
  export async function getGenderById(GenderId: number) {
    const Gender = await httpClient<Gender>({
      method: 'GET',
      endpoint: `/genders/${GenderId}`,
    });
    return Gender;
  }