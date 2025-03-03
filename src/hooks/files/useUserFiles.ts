import { useQuery } from '@tanstack/react-query';
import { getUserFiles } from '@/services';
import { PdfFile } from '@/types';

const useUserFiles = () => {
  const {
    data: files,
    isLoading,
    isError,
    error,
  } = useQuery<PdfFile[], Error>({
    queryKey: ['user-files'],
    queryFn: getUserFiles,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    files,
    isLoading,
    isError,
    error,
  };
};

export default useUserFiles;
