
import { getAllJobPositions } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllJobPositions = () => {
  const {
    data: jobPositions,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllJobPositions(),
    queryKey: ['getAllJobPositions'],
  });

  return {
    jobPositions,
    isLoading,
    isError,
  };
};

export default useGetAllJobPositions;
