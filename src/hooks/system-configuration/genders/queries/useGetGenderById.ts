import { getGenderById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetGenderById = (id: number) => {
  const {
    data: genderById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getGenderById(id),
    queryKey: ['getGenderById', id],
  });

  return {
    genderById,
    isLoading,
    isError,
  };
};
export default useGetGenderById;
