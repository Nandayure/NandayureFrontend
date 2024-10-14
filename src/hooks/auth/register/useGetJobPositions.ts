import { useQuery } from '@tanstack/react-query';

import { getJobsPositions } from '@/services';

const useGetJobsPositions = () => {
  const { data: JobsPositions } = useQuery({
    queryFn: async () => await getJobsPositions(),
    queryKey: ['JobsPositions'],
  });

  return {
    JobsPositions,
  };
};
export default useGetJobsPositions;
