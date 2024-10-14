import { getAllRequests } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllRequest = () => {
  const { data: allRequests, isLoading } = useQuery({
    queryFn: async () => await getAllRequests(),
    queryKey: ['getAllRequests'],
  });

  return {
    allRequests,
    isLoading,
  };
};

export default useGetAllRequest;
