import { getAllEmployees } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface GetEmployeesQueryParams {
  page?: string;
  limit?: string;
  name?: string;
}

const useGetAllEmployees = (params?: GetEmployeesQueryParams) => {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryFn: async () => await getAllEmployees(params),
    queryKey: ['getAllEmployees', params],
  });

  return {
    employees: data?.data || [],
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
    error: isError ? data : null,
    refetch,
  };
};

export default useGetAllEmployees;
