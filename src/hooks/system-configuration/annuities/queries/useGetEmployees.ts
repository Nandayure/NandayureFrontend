import { useQuery } from '@tanstack/react-query';
import { AnnuityEmployee } from '@/types';
import { getAllEmployees } from '@/services';

const useGetEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery<AnnuityEmployee[]>({
    queryFn: getAllEmployees,
    queryKey: ['getEmployees'],
  });
  return {
    employees,
    isLoading,
    isError,
  };
};

export default useGetEmployees;
