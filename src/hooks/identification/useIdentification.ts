import { CrIdentificationResponse } from '@/types';
import { fetchIdentification } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface UseIdentificationResult {
  identificationData: CrIdentificationResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchData: (identification: string) => Promise<void>;
}

export const useIdentification = (): UseIdentificationResult => {
  const [identification, setIdentification] = useState<string | null>(null);

  const {
    data: identificationData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['identification', identification],
    queryFn: async () => {
      if (!identification) throw new Error('No identification provided');
      return await fetchIdentification(identification);
    },
    enabled: !!identification,
  });

  const fetchData = async (newIdentification: string) => {
    try {
      setIdentification(newIdentification);
      await refetch()
    } catch (error: any) {
      console.error('Error fetching identification:', error);
    }
  };

  return {
    identificationData,
    isLoading,
    isError,
    error,
    fetchData,
  };
};