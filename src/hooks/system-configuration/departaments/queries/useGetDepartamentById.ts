import { getDepartamentById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetDepartamentById = (id: number) => {
  const {
    data: departmentById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getDepartamentById(id),
    queryKey: ['getDepartamentById', id],
  });

  return {
    departmentById,
    isLoading,
    isError,
  };
};
export default useGetDepartamentById;
