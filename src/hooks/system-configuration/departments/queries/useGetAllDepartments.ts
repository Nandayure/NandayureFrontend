import { getAllDepartments } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartments = () => {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllDepartments(),
    queryKey: ['getAllDepartments'],
  });

  return {
    departments,
    isLoading,
    isError,
  };
};
export default useGetAllDepartments;
