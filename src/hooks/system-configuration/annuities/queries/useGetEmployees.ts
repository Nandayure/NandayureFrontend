// src/hooks/useGetEmployees.ts

import { getEmployees } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { AnnuityEmployee } from '@/types';

const useGetEmployees = () => {
  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery<AnnuityEmployee[]>({
    queryFn: getEmployees,
    queryKey: ['getEmployees'],
  });
  console.log('Datos de empleados:', employees);
  return {
    employees,
    isLoading,
    isError,
  };
};

export default useGetEmployees;
