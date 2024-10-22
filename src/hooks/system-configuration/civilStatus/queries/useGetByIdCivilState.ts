
import { useQuery } from '@tanstack/react-query';

const useGetCivilStatusById = (id: number) => {
  const {
    data: civilStatusById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getCivilStatusById(id),
    queryKey: ['getCivilStatusById', id],
  });
  return {
    civilStatusById,
    isLoading,
    isError,
  };
};
export default useGetCivilStatusById;
function getCivilStatusById(id: number): any {
    throw new Error('Function not implemented.');
}

