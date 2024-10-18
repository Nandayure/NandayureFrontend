import { getAllStudiesCategories } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useGetAllStudiesCategory = () => {
  const {
    data: studiesCategory,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllStudiesCategories(),
    queryKey: ['getAllStudiesCategory'],
  })

  return {
    studiesCategory,
    isLoading,
    isError,
  }
}

export default useGetAllStudiesCategory;