import { getAllGenders } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllGender = () => {
  const {
    data: genders,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllGenders(),
    queryKey: ['getAllGender'],
  });

  return {
    genders,
    isLoading,
    isError,
  };
};
export default useGetAllGender;
