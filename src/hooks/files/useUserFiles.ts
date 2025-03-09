import { useQuery } from '@tanstack/react-query';
import { getUserFiles } from '@/services';
import { PdfFile } from '@/types';

const useUserFiles = (id: string) => {
  const {
    data: files,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<PdfFile[], Error>({
    queryKey: ['user-files', id],
    queryFn: () => getUserFiles(id),
    staleTime: 0,
    refetchOnWindowFocus: false,
    placeholderData: undefined,
  });

  // Determinar si está en estado de transición
  const isTransitioning = isLoading || isFetching;

  return {
    files,
    isLoading: isTransitioning,
    isError,
    error,
  };
};

export default useUserFiles;
