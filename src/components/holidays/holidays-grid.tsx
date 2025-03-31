"use client"

import { Loader2 } from "lucide-react"
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"
import HolidayCard from "./holiday-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HolidaysGrid() {
  const { holidays, isError, isLoading, error } = useGetHolidays()

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Cargando...</span>
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || "No se pudieron cargar los días feriados. Por favor, inténtelo de nuevo más tarde."}
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && holidays?.length === 0 && (
        <Alert>
          <AlertTitle>No se encontraron días feriados</AlertTitle>
          <AlertDescription>Actualmente no hay días feriados registrados en el sistema.</AlertDescription>
        </Alert>
      )}

      {!isLoading && holidays && holidays.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {holidays.map((holiday) => (
            <HolidayCard key={holiday.id} holiday={holiday} />
          ))}
        </div>
      )}
    </div>
  )
}

