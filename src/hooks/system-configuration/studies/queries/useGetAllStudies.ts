import { getAllStudies } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllStudies = () => {
  const {
    data: studies,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllStudies(),
    queryKey: ['getAllStudies'],
  });

  return { studies, isLoading, isError };
};

export default useGetAllStudies;
