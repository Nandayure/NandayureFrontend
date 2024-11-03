import { getAnnuityById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAnnuityById = (id: number) => {
  const {
    data: annuity,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getAnnuityById(id),
    queryKey: ['getAnnuityById', id],
  });

  return {
    annuity,
    isLoading,
    isError,
  };
};

export default useGetAnnuityById;
