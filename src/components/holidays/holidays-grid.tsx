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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Cargando días feriados...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertTitle>Error al cargar los días feriados</AlertTitle>
        <AlertDescription>
          {error?.message || "No se pudieron cargar los días feriados. Por favor, inténtelo de nuevo más tarde."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="all"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">
              <span className="mr-2">Todos</span>
              <Badge variant="secondary">
                {totalCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="recurring">
              <span className="mr-2">Recurrentes</span>
              <Badge variant="secondary">
                {recurringCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="regular">
              <span className="mr-2">Específicos</span>
              <Badge variant="secondary">
                {regularCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHolidays.map((holiday) => (
              <HolidayCard key={holiday.id} holiday={holiday} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recurring">
          {recurringCount === 0 ? (
            <Alert>
              <AlertTitle>No hay días feriados recurrentes</AlertTitle>
              <AlertDescription>No se encontraron días feriados recurrentes anuales.</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHolidays.map((holiday) => (
                <HolidayCard key={holiday.id} holiday={holiday} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="regular">
          {regularCount === 0 ? (
            <Alert>
              <AlertTitle>No hay días feriados específicos</AlertTitle>
              <AlertDescription>No se encontraron días feriados de fecha específica.</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHolidays.map((holiday) => (
                <HolidayCard key={holiday.id} holiday={holiday} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}