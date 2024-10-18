import { getAllBudgetCodes } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllBudgetCodes = () => {
  const {
    data: budgetCodes,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllBudgetCodes(),
    queryKey: ['getAllBudgetCodes'],
  });

  return {
    budgetCodes,
    isLoading,
    isError,
  };
};
export default useGetAllBudgetCodes;
