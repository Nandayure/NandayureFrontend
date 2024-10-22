'use client';
import { AvailableVacationDays } from '@/components/request/request-vacation/AvailableVacationDays';
import RequestVacationForm from '@/components/request/request-vacation/request-vacation-form';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetByIdEmployee, useGetEmployeeId } from '@/hooks';

const VacationRequestPage = () => {
  const { employeeId } = useGetEmployeeId();
  const {
    employeeById: employeeData,
    isError,
    isLoading,
  } = useGetByIdEmployee({
    employeeId,
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto overflow-hidden">
        {isLoading ? (
          <Skeleton className="w-full h-[100px]" />
        ) : isError ? (
          <div className="text-red-500">
            Error al cargar los datos del empleado
          </div>
        ) : (
          <AvailableVacationDays
            days={employeeData?.AvailableVacationDays || 0}
          />
        )}
      </div>
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <RequestVacationForm />
      </div>
    </div>
  );
};

export default VacationRequestPage;
