import { fetchFilesByEmployee } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetFoldersByEmployee = (employeeId: number) => {
  const {
    data: foldersByEmployee,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['foldersByEmployee'],
    queryFn: async () => fetchFilesByEmployee(employeeId),
  });

  return {
    foldersByEmployee,
    isLoading,
    isError,
    error,
    refetch,
  };
};
export default useGetFoldersByEmployee;
