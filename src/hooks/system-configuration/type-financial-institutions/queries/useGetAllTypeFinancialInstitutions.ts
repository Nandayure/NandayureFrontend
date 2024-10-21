import { getAllTypeFinancialInstitutions } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetAllTypeFinancialInstitutions = () => {
  const {
    data: typeFinancialInstitutions,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getAllTypeFinancialInstitutions(),
    queryKey: ['getAllTypeFinancialInstitutions'],
  });

  return {
    typeFinancialInstitutions,
    isLoading,
    isError,
  };
};

export default useGetAllTypeFinancialInstitutions;
