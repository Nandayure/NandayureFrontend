"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useRequestData } from "@/hooks/use-request-data"
import { SummaryCards } from "@/components/charts/summary-cards"
import { RequestTypePieChart } from "@/components/charts/request-type-pie-chart"
import { RequestStatusBarChart } from "@/components/charts/request-status-bar-chart"

export default function Dashboard() {
  const { data, isLoading, error, refreshData } = useRequestData()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    refreshData().finally(() => {
      setTimeout(() => {
        setIsRefreshing(false)
      }, 600) // Duración de la animación
    })
  }

  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No se pudieron cargar los datos. Por favor, intente nuevamente más tarde.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard de Solicitudes</h1>
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

      <div className="space-y-4">
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <SummaryCards
              totalRequests={data.totalRequests}
              lastUpdated={data.lastUpdated}
              totalApproved={data.totalApproved.total}
              totalRejected={data.totalRejected.total}
              totalPending={data.totalPending.total}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Tipo</CardTitle>
                  <CardDescription>Distribución de solicitudes por categoría</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <RequestTypePieChart
                    vacationRequests={data.vacationRequests}
                    salaryCertificateRequests={data.salaryCertificateRequests}
                    paymentConfirmationRequests={data.paymentConfirmationRequests}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estado de Solicitudes</CardTitle>
                  <CardDescription>Cantidad de solicitudes por estado</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <RequestStatusBarChart
                    totalApproved={data.totalApproved}
                    totalRejected={data.totalRejected}
                    totalPending={data.totalPending}
                  />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
      </div>
    </>
  )
}

