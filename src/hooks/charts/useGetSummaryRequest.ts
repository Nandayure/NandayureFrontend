import { fecthSummaryRequest } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useSummaryRequest = () => {
  const {
    data: summaryRequest,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['summaryRequest'],
    queryFn: fecthSummaryRequest,
    retry: 2,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });

  return {
    summaryRequest,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useSummaryRequest;
