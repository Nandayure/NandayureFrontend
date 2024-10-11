import { vacationsProps } from "@/types";


/**
 * 
 * @param id -
 * @returns 
 */
export async function getVacationCertificateData({ id }: { id: string }): Promise<vacationsProps | null> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await fetch(
      `https://66d90c3e4ad2f6b8ed5352b1.mockapi.io/api/constancia/ConstanciaSalarial/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
   
    return data ? data : null;
  } catch (error) {
    console.error('Error al obtener la boleta de vacaciones:', error);
    return null;
  }
}
