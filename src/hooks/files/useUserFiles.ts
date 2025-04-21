import { useQuery } from '@tanstack/react-query';
import { getUserFiles } from '@/services';
import { GetFilesFilterDto } from '@/types/files/filterTypes.d';
import { PaginatedFilesResponse, PdfFile } from '@/types/files/file.d';
import { useState } from 'react';

const useUserFiles = (id: string, initialFilters?: GetFilesFilterDto) => {
  const [filters, setFilters] = useState<GetFilesFilterDto>(initialFilters || {
    limit: 10,
    orderBy: 'modifiedTime',
    orderDirection: 'desc'
  });

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useQuery<PaginatedFilesResponse, Error>({
    queryKey: ['user-files', id, filters],
    queryFn: () => getUserFiles(id, filters),
    staleTime: 0,
    refetchOnWindowFocus: false
  });

  // Función para actualizar filtros
  const updateFilters = (newFilters: Partial<GetFilesFilterDto>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      pageToken: undefined // Reset pageToken when filters change
    }));
  };

  // Función para cargar la siguiente página
  const loadNextPage = () => {
    if (data?.nextPageToken) {
      setFilters(prev => ({
        ...prev,
        pageToken: data.nextPageToken || undefined
      }));
    }
  };

  // Determinar si está en estado de transición
  const isTransitioning = isLoading || isFetching;

  return {
    files: data?.data || [],
    total: data?.totalItems || 0,
    nextPageToken: data?.nextPageToken,
    isLoading: isTransitioning,
    isError,
    error,
    filters,
    updateFilters,
    loadNextPage,
    hasNextPage: !!data?.nextPageToken,
    isFetchingNextPage: isFetching && !!filters.pageToken,
    refetch
  };
};

export default useUserFiles;
