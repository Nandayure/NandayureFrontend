"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"
import HolidayCard from "./holiday-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function HolidaysGrid() {
  const { holidays, isError, isLoading, error } = useGetHolidays()
  const [activeTab, setActiveTab] = useState("all")

  // Filter holidays based on tab selection
  const filteredHolidays = !holidays ? [] :
    activeTab === "all" ? holidays :
      activeTab === "recurring" ? holidays.filter(holiday => holiday.isRecurringYearly) :
        holidays.filter(holiday => !holiday.isRecurringYearly)

  // Count holidays for each category
  const recurringCount = holidays?.filter(h => h.isRecurringYearly)?.length || 0
  const regularCount = holidays?.filter(h => !h.isRecurringYearly)?.length || 0
  const totalCount = holidays?.length || 0

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
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                Todos
                <Badge className="ml-2 bg-primary/20 text-primary">{totalCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="recurring" className="relative">
                Recurrentes Anuales
                <Badge className="ml-2 bg-primary/20 text-primary">{recurringCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="regular" className="relative">
                Días Específicos
                <Badge className="ml-2 bg-primary/20 text-primary">{regularCount}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {holidays.map((holiday) => (
                <HolidayCard key={holiday.id} holiday={holiday} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recurring" className="mt-0">
            {recurringCount === 0 ? (
              <Alert>
                <AlertTitle>No hay días feriados recurrentes</AlertTitle>
                <AlertDescription>No se encontraron días feriados recurrentes anuales.</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHolidays.map((holiday) => (
                  <HolidayCard key={holiday.id} holiday={holiday} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="regular" className="mt-0">
            {regularCount === 0 ? (
              <Alert>
                <AlertTitle>No hay días feriados específicos</AlertTitle>
                <AlertDescription>No se encontraron días feriados de fecha específica.</AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHolidays.map((holiday) => (
                  <HolidayCard key={holiday.id} holiday={holiday} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}