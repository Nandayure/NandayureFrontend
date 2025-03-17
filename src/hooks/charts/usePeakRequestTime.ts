import { fetchPeakRequestTimes } from '@/services';
import { useQuery } from '@tanstack/react-query';

const usePeakRequestTimes = () => {
  const {
    data: peakRequestTimes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['peakRequestTimes'],
    queryFn: fetchPeakRequestTimes,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    peakRequestTimes,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default usePeakRequestTimes;
