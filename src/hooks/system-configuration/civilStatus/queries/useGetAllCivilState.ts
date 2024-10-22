import { getAllCivilStatus } from '@/services';
import { useQuery } from '@tanstack/react-query';
const useGetAllCivilStatus = () => {
  const {
    data: civilStatus,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllCivilStatus(),
    queryKey: ['getAllCivilStatus'],
  });
  return {
    civilStatus,
    isLoading,
    isError,
  };
};
export default useGetAllCivilStatus;




