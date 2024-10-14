import { getGenders } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetGenders = () => {
  const { data: genders } = useQuery({
    queryFn: async () => await getGenders(),
    queryKey: ['genders'],
  });

  return {
    genders,
  };
};

export default useGetGenders;
