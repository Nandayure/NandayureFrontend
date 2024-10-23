import { getAllGender } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllGenders = () => {
  const {
    data: genders,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllGender(),
    queryKey: ['getAllGender'],
  });

  return {
    genders,
    isLoading,
    isError,
  };
};
export default useGetAllGenders;
