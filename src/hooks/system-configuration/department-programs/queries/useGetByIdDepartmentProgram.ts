import { getDepartmentById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetByIdDepartmentProgram = (id: number) => {
  const {
    data: ByIdDepartmentProgram,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getDepartmentById(id),
    queryKey: ['getByIdDepartmentProgram', id],
  });

  return {
    ByIdDepartmentProgram,
    isLoading,
    isError,
  };
};

export default useGetByIdDepartmentProgram;
