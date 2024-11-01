import { getBudgetCodesById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetBudgetCodeyId = (id: number) => {
  const {
    data: budgetCodeById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getBudgetCodesById(id),
    queryKey: ['getDepartamentById', id],
  });

  return {
    budgetCodeById,
    isLoading,
    isError,
  };
};
export default useGetBudgetCodeyId;
