import { useQuery } from '@tanstack/react-query';
import { fetchUnavailableUsers } from '@/services/user/queries/actions';
import { InactiveUser } from '@/types';

const useGetUnavailableUsers = () => {
  const {
    data: unavailableUsers,
    isLoading,
    isError,
  } = useQuery<InactiveUser[]>({
    queryKey: ['unavailableUsers'],
    queryFn: fetchUnavailableUsers,
  });

  return {
    unavailableUsers,
    isLoading,
    isError,
  };
};

export default useGetUnavailableUsers;