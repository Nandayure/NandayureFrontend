import { fetchAllUsers } from '@/services/user/queries/actions';
import { AvailableUserResponse, GetUsersQueryParams } from '@/types/user/user.response';
import { useQuery } from '@tanstack/react-query';

const useGetAllUsers = (params?: GetUsersQueryParams) => {
  const {
    data: allUsers,
    isLoading,
    isError,
  } = useQuery<AvailableUserResponse>({
    queryKey: ['allUsers', params],
    queryFn: () => fetchAllUsers(params),
  });

  return {
    allUsers,
    isLoading,
    isError,
  };
};

export default useGetAllUsers;
