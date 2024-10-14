import { getAllDepartaments } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartaments = () => {
  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllDepartaments(),
    queryKey: ['getAllDepartaments'],
  });

  return {
    departments,
    isLoading,
    isError,
  };
};
export default useGetAllDepartaments;
