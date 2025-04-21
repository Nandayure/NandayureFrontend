import { useQuery } from '@tanstack/react-query'
import { getEmployeeFiles } from '@/services'
import { GetFilesQueryParams, GetFilesResponse } from '@/types'

const useGetEmployeeFiles = (folderId: string, filters?: GetFilesQueryParams) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<GetFilesResponse>({
    queryKey: ['employee-files', folderId, filters],
    queryFn: () => getEmployeeFiles(folderId, filters),
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  return {
    files: data?.data || [],
    pagination: {
      limit: data?.limit || filters?.limit || 10,
      totalItems: data?.totalItems || 0,
      nextPageToken: data?.nextPageToken || null,
      hasNextPage: !!data?.nextPageToken,
    },
    isLoading: isLoading || isFetching,
    isError,
    error,
    refetch,
  }
}

export default useGetEmployeeFiles
