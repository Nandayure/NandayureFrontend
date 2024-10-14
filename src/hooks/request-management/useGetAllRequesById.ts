import { useQuery } from '@tanstack/react-query';
import useGetEmployeeId from '../common/useGetEmployeeId';
import { getAllRequestsById } from '@/services';

const useGetAllRequestById = () => {
  const { employeeId } = useGetEmployeeId();
  const {
    data: AllRequestsById,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      if (employeeId === undefined) {
        throw new Error('Employee ID is undefined');
      }
      return await getAllRequestsById(employeeId);
    },
    queryKey: ['AllRequestsById'],
  });

  return {
    AllRequestsById,
    isLoading,
    isError,
    error,
  };
};

export default useGetAllRequestById;
