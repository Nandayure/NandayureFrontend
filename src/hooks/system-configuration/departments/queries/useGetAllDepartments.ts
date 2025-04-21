import { getAllDepartments } from '@/services';
import { DepartmentsResponse, GetDepartmentsQueryParams } from '@/types/system-configuration/departaments/departments.response';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartments = (params?: GetDepartmentsQueryParams) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<DepartmentsResponse>({
    queryFn: () => getAllDepartments(params),
    queryKey: ['getAllDepartments', params],
  });

  return {
    departments: data?.data || [],
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

export default useGetAllDepartments;
