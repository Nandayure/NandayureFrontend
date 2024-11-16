// hooks/useGetAllAnnuities.ts

import { getAllAnnuities } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Annuity, AnnuityEmployee } from '@/types';
import useGetEmployees from './useGetEmployees';

const useGetAllAnnuities = () => {
  const { employees, isLoading: isLoadingEmployees } = useGetEmployees();
  
  const {
    data: annuities,
    isLoading: isLoadingAnnuities,
    isError: isErrorAnnuities,
  } = useQuery<Annuity[]>({
    queryFn: getAllAnnuities,
    queryKey: ['getAllAnnuities'],
  }); 

  const annuitiesWithEmployees = annuities?.map((annuity) => {
    const employee = employees?.find((emp: AnnuityEmployee) => emp.id === annuity.EmployeeId);
    return {
      ...annuity,
      Employee: employee || null,
    };
  });

  return {
    annuities: annuitiesWithEmployees,
    isLoading: isLoadingAnnuities || isLoadingEmployees,
    isError: isErrorAnnuities,
  };
};

export default useGetAllAnnuities;
