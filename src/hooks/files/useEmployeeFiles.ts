import { useQuery } from '@tanstack/react-query';
import { getEmployeeFiles } from '@/services';
import { EmployeeFile, PdfFile } from '@/types';

export const useEmployeeFiles = (folderId: string | undefined) => {
  const {
    data: files,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PdfFile[]>({
    queryKey: ['employee-files', folderId],
    queryFn: () => {
      if (!folderId) {
        throw new Error('No se proporcionó el ID del empleado');
      }
      return getEmployeeFiles(folderId);
    },
    enabled: Boolean(folderId),
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
