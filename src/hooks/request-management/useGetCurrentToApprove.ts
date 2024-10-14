import { getCurrentToApprove } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useGetToken from '../common/useGetToken';

const useGetCurrentToApprove = () => {
  const { token, status } = useGetToken();

  const { data: currentToApprove, isLoading: queryLoading } = useQuery({
    queryFn: async () => await getCurrentToApprove(token),
    queryKey: ['getCurrentToApprove'],
    enabled: status !== 'loading',
  });

  const isLoading = status === 'loading' || queryLoading;

  return {
    currentToApprove,
    isLoading,
  };
};

export default useGetCurrentToApprove;
