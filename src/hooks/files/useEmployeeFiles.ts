import { useQuery } from '@tanstack/react-query';
import { getEmployeeFiles } from '@/services';
import { EmployeeFile } from '@/types';

export const useEmployeeFiles = (employeeId: string | undefined) => {
  const {
    data: files,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<EmployeeFile[], Error>({
    queryKey: ['employee-files', employeeId],
    queryFn: () => {
      if (!employeeId) {
        throw new Error('No se proporcionó el ID del empleado');
      }
      return getEmployeeFiles(employeeId);
    },
    enabled: Boolean(employeeId),
    staleTime: 5 * 60 * 1000, 
    retry: false,
  });

  return {
    files,
    isLoading,
    isError,
    error,
    refetch,
  };
};
