import { useQuery } from '@tanstack/react-query';
import { getAllRequests } from '@/services';
import { RequestDetails } from '@/types/request-management/commonTypes';

export interface UseGetAllRequestParams {
  RequestStateId?: number;
  RequestTypeId?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
}

interface PaginatedResponse {
  data: RequestDetails[];
  totalItems: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const useGetAllRequestById = (params?: UseGetAllRequestParams) => {
  const query = useQuery<PaginatedResponse>({
    queryFn: () => getAllRequests(params),
    queryKey: ['AllRequestsById', params],
  });

  return query;
};

export default useGetAllRequestById;
