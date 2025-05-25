"use client"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetByIdEmployee, useGetEmployeeId } from "@/hooks"
import { AvailableVacationDays } from "@/components/request/request-vacation/AvailableVacationDays"
import RequestVacationForm from "@/components/request/request-vacation/request-vacation-form"

const VacationRequestPage = () => {
  const { employeeId } = useGetEmployeeId()
  const { employeeById: employeeData, isError, isLoading } = useGetByIdEmployee({ employeeId })

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Available Days Card */}
        <Suspense fallback={<Skeleton className="w-full h-[120px]" />}>
          {isLoading ? (
            <Skeleton className="w-full h-[120px]" />
          ) : isError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
              Error al cargar los datos del empleado
            </div>
          ) : (
            <AvailableVacationDays days={employeeData?.AvailableVacationDays || 0} />
          )}
        </Suspense>

        {/* Request Form */}
        <div className="bg-white border shadow-sm rounded-lg p-4 md:p-6">
          <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
            <RequestVacationForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default VacationRequestPage
