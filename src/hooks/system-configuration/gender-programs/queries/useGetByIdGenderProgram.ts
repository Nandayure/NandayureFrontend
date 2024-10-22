import { getDepartmentById } from '@/services';
import { getGenderById } from '@/services/system-configuration/gender-programs/queries/actions';
import { useQuery } from '@tanstack/react-query';

const useGetByIdGenderProgram = (id: number) => {
  const {
    data: ByIdGenderProgram,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getGenderById(id),
    queryKey: ['getByIdGenderProgram', id],
  });

  return {
    ByIdGenderProgram,
    isLoading,
    isError,
  };
};

export default useGetByIdGenderProgram;
