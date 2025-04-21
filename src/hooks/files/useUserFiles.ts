import { useQuery } from '@tanstack/react-query'
import { getUserFiles } from '@/services'
import { GetFilesQueryParams, GetFilesResponse } from '@/types'

const useGetUserFiles = (folderId: string, filters?: GetFilesQueryParams) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<GetFilesResponse>({
    queryKey: ['user-files', folderId, filters],
    queryFn: () => getUserFiles(folderId, filters),
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  return {
    files: data?.data || [],
    pagination: {
      limit: data?.limit || filters?.limit || 10,
      nextPageToken: data?.nextPageToken || null,
      previusPageToken: data?.previusPageToken || null,
      hasNextPage: data?.hasNextPage ?? !!data?.nextPageToken,
      hasPreviusPage: data?.hasPreviusPage ?? !!data?.previusPageToken,
    },
    isLoading: isLoading || isFetching,
    isError,
    error,
    refetch,
  }
}

export default useGetUserFiles
