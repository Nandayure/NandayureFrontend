import { getAllFinancialInstitutions } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllFinancialInstitutions = () => {
  const {
    data: financialInstitutions,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllFinancialInstitutions(),
    queryKey: ['getAllFinancialInstitutions'],
  });

  return {
    financialInstitutions,
    isLoading,
    isError,
  };
};

export default useGetAllFinancialInstitutions;
