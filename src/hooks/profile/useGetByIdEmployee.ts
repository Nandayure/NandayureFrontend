import { getByIdEmployee } from '@/services';
import { useQuery } from '@tanstack/react-query';

interface Props {
  employeeId: number | undefined;
}

const useGetByIdEmployee = ({ employeeId }: Props) => {
  const {
    data: employeeById,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      if (employeeId === undefined) {
        throw new Error('Employee ID is undefined');
      }
      return await getByIdEmployee({ employeeId });
    },
    queryKey: ['employeeById', employeeId],
    enabled: !!employeeId,
  });

  return {
    employeeById,
    isLoading,
    isError,
    error,
  };
};

export default useGetByIdEmployee;
