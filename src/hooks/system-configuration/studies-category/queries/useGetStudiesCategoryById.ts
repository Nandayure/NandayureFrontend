import { getStudiesCategoryById } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetStudiesCategoryById = (id: string) => {
  const {
    data: studiesCategoryById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getStudiesCategoryById(id),
    queryKey: ['getStudiesCategoryById', id],
  });

  return {
    studiesCategoryById,
    isLoading,
    isError,
  };
}

export default useGetStudiesCategoryById;
