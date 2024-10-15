import { getDepartmentById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetDepartmentById = (id: number) => {
  const {
    data: departmentById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getDepartmentById(id),
    queryKey: ['getDepartamentById', id],
  });

  return {
    departmentById,
    isLoading,
    isError,
  };
};
export default useGetDepartmentById;
