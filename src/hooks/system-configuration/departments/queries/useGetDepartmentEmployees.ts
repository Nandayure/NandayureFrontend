import { getAllEmployeesByDepartmentId } from '@/services';
import { DepartmentEmployees } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useGetDepartmentEmployees = (departmentId: number) => {
  const {
    data: departmentEmployees,
    isLoading,
    isError,
  } = useQuery<DepartmentEmployees[]>({
    queryKey: ['getDepartmentEmployees', departmentId],
    queryFn: () => getAllEmployeesByDepartmentId(departmentId),
    enabled: !!departmentId,
  });

  return {
    departmentEmployees,
    isLoading,
    isError,
  };
};

export default useGetDepartmentEmployees;