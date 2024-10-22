import { getAllGenderPrograms } from '@/services/system-configuration/gender-programs/queries/actions';
import { useQuery } from '@tanstack/react-query';

const useGetAllGenderPrograms = () => {
  const {
    data: genderPrograms,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllGenderPrograms(),
    queryKey: ['getAllGenderPrograms'],
  });

  return {
    genderPrograms,
    isLoading,
    isError,
  };
};
export default useGetAllGenderPrograms;
