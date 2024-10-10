// src/hooks/useVacationsData.ts

import { useQuery } from '@tanstack/react-query';
import { getVacationCertificateData } from '@/services/templates/vacations/actions';
import { vacationsProps } from '@/types/templates/vacations';

interface UseVacationsDataProps {
  id: string;
}

export const useVacationsData = ({ id }: UseVacationsDataProps) => {
  const { data, isLoading, error } = useQuery<vacationsProps | null>({
    queryFn: async () => await getVacationCertificateData({ id }), 
    queryKey: ['vacationCertificate', id],
  });

  return {
    data,
    isLoading,
    error,
  };
};
