
import { getJobPositionsById } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface UseGetJobPositionByIdProps {
  jobPositionId: number;
}

const useGetJobPositionById = ({
  jobPositionId,
}: UseGetJobPositionByIdProps) => {
  const {
    data: jobPositionById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getJobPositionsById(jobPositionId),
    queryKey: ['getJobPositionById', jobPositionId],
  });

  return {
    jobPositionById,
    isLoading,
    isError,
  };
};

export default useGetJobPositionById;
