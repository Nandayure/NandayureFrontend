import { getTypeFinancialInstitutionById } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useGetTypeFinancialInstitutionById = (id: number) => {
  const {
    data: typeFinancialInstitutionById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getTypeFinancialInstitutionById(id),
    queryKey: ['getTypeFinancialInstitutionById', id],
  });

  return {
    typeFinancialInstitutionById,
    isLoading,
    isError,
  };
};

export default useGetTypeFinancialInstitutionById;
