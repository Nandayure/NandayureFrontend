"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSummaryRequest } from "@/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { SummaryCards } from "@/components/charts/summary-cards"
import { RequestTypePieChart } from "@/components/charts/request-type-pie-chart"
import { RequestStatusBarChart } from "@/components/charts/request-status-bar-chart"
import { MonthYearPicker } from "@/components/charts/month-year-picker"
import { TopEmployeesCard } from "@/components/charts/top-employees-card"
import DashboardExportButton from "@/components/charts/dashboard-export-button"

export default function Dashboard() {
  const { summaryRequest, isLoading, isError, error, refetch } = useSummaryRequest()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Estado para los filtros de año y mes
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)

  // Valor predeterminado para el límite de empleados a mostrar
  const [employeeLimit, setEmployeeLimit] = useState<number>(5)

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setTimeout(() => {
        setIsRefreshing(false)
      }, 600)
    })
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No se pudieron cargar los datos. Por favor, intente nuevamente más tarde.</p>
            {error instanceof Error && <p className="text-sm text-muted-foreground mt-2">{error.message}</p>}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show loading state if data is loading or doesn't exist yet
  if (isLoading || !summaryRequest) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard de solicitudes</h1>
            <p className="text-muted-foreground">Visualización de datos de solicitudes y su estado actual.</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            aria-label="Actualizar datos"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin-once" : ""}`} />
          </Button>
        </div>
        <LoadingState />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard de solicitudes</h1>
          <p className="text-muted-foreground">Visualización de datos de solicitudes y su estado actual.</p>
        </div>
        <div className="flex items-center gap-4">
          <DashboardExportButton summaryData={summaryRequest} isDisabled={isLoading || isRefreshing} />
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading || isRefreshing}
            aria-label="Actualizar datos"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin-once" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <SummaryCards
          totalRequests={summaryRequest.totalRequests}
          lastUpdated={summaryRequest.lastUpdated}
          totalApproved={summaryRequest.totalApproved.total}
          totalRejected={summaryRequest.totalRejected.total}
          totalPending={summaryRequest.totalPending.total}
        />



        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por tipo</CardTitle>
              <CardDescription>Distribución de solicitudes por categoría</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RequestTypePieChart
                vacationRequests={summaryRequest.vacationRequests}
                salaryCertificateRequests={summaryRequest.salaryCertificateRequests}
                paymentConfirmationRequests={summaryRequest.paymentConfirmationRequests}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado de solicitudes</CardTitle>
              <CardDescription>Cantidad de solicitudes por estado</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RequestStatusBarChart
                totalApproved={summaryRequest.totalApproved}
                totalRejected={summaryRequest.totalRejected}
                totalPending={summaryRequest.totalPending}
              />
            </CardContent>
          </Card>
        </div>

        <MonthYearPicker
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
        />

        {/* Tarjeta de empleados con más solicitudes */}
        <TopEmployeesCard
          query={{
            limit: employeeLimit,
            month: selectedMonth,
            year: selectedYear
          }}
        />
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <>
      {/* Summary cards skeleton */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-4">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 mb-2" /> {/* Título de la tarjeta */}
            <Skeleton className="h-9 w-16 mb-1" /> {/* Número grande */}
            <Skeleton className="h-4 w-32" /> {/* Texto pequeño */}
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-28 mb-2" />
            <Skeleton className="h-9 w-16 mb-1" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-9 w-16 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-9 w-16 mb-1" />
            <Skeleton className="h-4 w-40" />
          </CardContent>
        </Card>
      </div>

      {/* Añadir skeleton para los filtros */}
      <div className="mb-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-16 mb-1" /> {/* Título de filtros */}
          </CardHeader>
          <CardContent className="flex gap-4">
            <Skeleton className="h-10 w-28" /> {/* Dropdown año */}
            <Skeleton className="h-10 w-28" /> {/* Dropdown mes */}
          </CardContent>
        </Card>
      </div>

      {/* Charts skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pie chart card skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" /> {/* Título */}
            <Skeleton className="h-4 w-72" /> {/* Descripción */}
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="relative h-64 w-64">
              <Skeleton className="h-64 w-64 rounded-full" /> {/* Círculo para el pie chart */}
            </div>
          </CardContent>
        </Card>

        {/* Bar chart card skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" /> {/* Título */}
            <Skeleton className="h-4 w-72" /> {/* Descripción */}
          </CardHeader>
          <CardContent className="h-80 flex flex-col justify-end">
            <div className="flex items-end justify-between gap-2 h-64 w-full">
              <Skeleton className="w-1/3 h-[70%]" /> {/* Barra 1 */}
              <Skeleton className="w-1/3 h-[40%]" /> {/* Barra 2 */}
              <Skeleton className="w-1/3 h-[90%]" /> {/* Barra 3 */}
            </div>
            <div className="flex justify-between mt-4">
              <Skeleton className="h-4 w-20" /> {/* Etiqueta 1 */}
              <Skeleton className="h-4 w-20" /> {/* Etiqueta 2 */}
              <Skeleton className="h-4 w-20" /> {/* Etiqueta 3 */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top employees skeleton */}
      <Card className="mt-4">
        <CardHeader>
          <Skeleton className="h-6 w-64 mb-2" /> {/* Título */}
          <Skeleton className="h-4 w-96" /> {/* Descripción */}
        </CardHeader>
        <CardContent>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="mb-4 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}