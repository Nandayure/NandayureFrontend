import { fetchEmployeesWithMostRequests } from '@/services';
import { EmployeesWithMostRequestsQuery } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useEmployeesWithMostRequests = (query: EmployeesWithMostRequestsQuery) => {
  const {
    data: employeesWithMostRequests,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['employeesWithMostRequests', query],
    queryFn: () => fetchEmployeesWithMostRequests(query),
    retry: 2,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    enabled: !!query, 
  });

  return {
    employeesWithMostRequests,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useEmployeesWithMostRequests;