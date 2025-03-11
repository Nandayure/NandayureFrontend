import { fetchDatesWithRequests } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useDatesWithRequests = () => {
  const {
    data: datesWithRequests,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['datesWithRequests'],
    queryFn: fetchDatesWithRequests,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });

  return {
    datesWithRequests,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useDatesWithRequests;
