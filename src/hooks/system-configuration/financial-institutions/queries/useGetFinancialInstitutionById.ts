import { getFinancialInstitutionById } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface UseGetFinancialInstitutionByIdProps {
  financialInstitutionId: number;
}

const useGetFinancialInstitutionById = ({
  financialInstitutionId,
}: UseGetFinancialInstitutionByIdProps) => {
  const {
    data: financialInstitutionById,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getFinancialInstitutionById(financialInstitutionId),
    queryKey: ['getFinancialInstitutionById', financialInstitutionId],
  });

  return {
    financialInstitutionById,
    isLoading,
    isError,
  };
};

export default useGetFinancialInstitutionById;
