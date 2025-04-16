import { CrIdentificationResponse } from '@/types';

/**
 * Fetches Costa Rican identification information from the GoMeta API
 * @param identification The identification number to query
 * @returns Promise with the identification details
 */
export const fetchIdentification = async (identification: string): Promise<CrIdentificationResponse> => {
  const response = await fetch(`https://apis.gometa.org/cedulas/${identification}`);
  if (!response.ok) {
    throw new Error('Error fetching identification information');
  }
  return await response.json();
};