import { useQuery } from '@tanstack/react-query';
import { fetchAvailableUsers } from '@/services/user/queries/actions';
import { ActiveUser } from '@/types';

const useGetAvailableUsers = () => {
  const {
    data: availableUsers,
    isLoading,
    isError,
  } = useQuery<ActiveUser[]>({
    queryKey: ['availableUsers'],
    queryFn: fetchAvailableUsers,
  });

  return {
    availableUsers,
    isLoading,
    isError,
  };
};

export default useGetAvailableUsers;