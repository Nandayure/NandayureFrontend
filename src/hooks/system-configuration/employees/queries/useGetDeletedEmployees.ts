import { fetchEmployeesDeleted } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetDeletedEmployees = () => {
  const {
    data: deletedEmployees,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await fetchEmployeesDeleted(),
    queryKey: ['getDeletedEmployees'],
  });

  return {
    deletedEmployees,
    isLoading,
    isError,
  };
}
export default useGetDeletedEmployees;