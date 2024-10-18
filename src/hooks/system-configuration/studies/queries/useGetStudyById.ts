import { getStudiesCategoryById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetStudyById = (studyId: string) => {
  const {
    data: studiesCategoryById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getStudiesCategoryById(studyId),
    queryKey: ['getStudiesCategoryById', studyId],
  });

  return {
    studiesCategoryById,
    isLoading,
    isError,
  };
};

export default useGetStudyById;
