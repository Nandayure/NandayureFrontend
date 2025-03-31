import { useQuery } from '@tanstack/react-query';
import { fetchHolidays } from '@/services/holiday/queries/actions';

const useGetHolidays = () => {
  const {
    data: holidays,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['holidays'],
    queryFn: fetchHolidays,
  });

  return {
    holidays,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetHolidays;