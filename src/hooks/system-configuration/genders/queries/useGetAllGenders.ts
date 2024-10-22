import { getAllGenderPrograms } from '@/services/system-configuration/gender-programs/queries/actions';
import { useQuery } from '@tanstack/react-query';

const useGetAllDepartments = () => {
  const {
    data: genders,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllGenderPrograms(),
    queryKey: ['getAllGenderPrograms'],
  });

  return {
    genders,
    isLoading,
    isError,
  };
};
export default getAllGenderPrograms;
