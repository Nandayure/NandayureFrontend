import { getAllEmployees } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllEmployees(),
    queryKey: ['getAllEmployees'],
  });

  return {
    employees,
    isLoading,
    isError,
  };
};
export default useGetAllEmployees;
