import { getCurrentToApprove } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useGetToken from '../common/useGetToken';

const useGetCurrentToApprove = () => {
  const { data, isLoading: queryLoading } = useQuery({
    queryFn: async () => await getCurrentToApprove(),
    queryKey: ['getCurrentToApprove'],
  });

  const isLoading = queryLoading;
  const sortedRequests = Array.isArray(data) ? [...data].reverse() : undefined;

  return {
    currentToApprove: sortedRequests,
    isLoading,
  };
};

export default useGetCurrentToApprove;
