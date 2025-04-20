import { getAllJobPositions } from '@/services';
import { JobPositionsResponse, GetJobPositionsQueryParams } from '@/types/system-configuration/job-positions/job-positions.response';
import { useQuery } from '@tanstack/react-query';

const useGetAllJobPositions = (params?: GetJobPositionsQueryParams) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<JobPositionsResponse>({
    queryFn: () => getAllJobPositions(params),
    queryKey: ['getAllJobPositions', params],
  });

  return {
    jobPositions: data?.data || [],
    pagination: {
      page: data?.page || 1,
      limit: data?.limit || 10,
      totalItems: data?.totalItems || 0,
      totalPages: data?.totalPages || 1,
      hasNextPage: data?.hasNextPage || false,
      hasPreviousPage: data?.hasPreviousPage || false,
    },
    isLoading,
    isError,
    error,
    refetch
  };
};

export default useGetAllJobPositions;
