import { getAllDepartmentPrograms } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartmentPrograms = () => {
  const {
    data: departmentPrograms,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllDepartmentPrograms(),
    queryKey: ['getAllDepartmentPrograms'],
  });

  return {
    departmentPrograms,
    isLoading,
    isError,
  };
};
export default useGetAllDepartmentPrograms;
