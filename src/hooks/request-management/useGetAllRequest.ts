import { getAllRequests } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface UseGetAllRequestParams {
  page?: number;
  limit?: number;
  searchQuery?: string;
  RequestTypeId?: number;
  RequestStateId?: number;
  startDate?: string;
  endDate?: string;
  EmployeeId?: string;
}

const useGetAllRequest = (params?: UseGetAllRequestParams) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getAllRequests(params),
    queryKey: ['getAllRequests', params],
  });

  return {
    allRequests: data?.data || [],
    isLoading,
    pagination: {
      page: data?.page || 1,
      limit: data?.limit || 10,
      totalItems: data?.totalItems || 0,
      totalPages: data?.totalPages || 1,
      hasNextPage: data?.hasNextPage || false,
      hasPreviousPage: data?.hasPreviousPage || false,
    },
  };
};

export default useGetAllRequest;
