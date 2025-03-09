import { fetchMyFolders } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetMyFolders = () => {
  const {
    data: myFolders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['myFolders'],
    queryFn: fetchMyFolders,
  });

  return {
    myFolders,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetMyFolders;