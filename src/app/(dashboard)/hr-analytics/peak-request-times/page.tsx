"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PeakRequestTimesVisualization } from "@/components/charts/peak-request-times-visualization"
import usePeakRequestTimes from "@/hooks/charts/usePeakRequestTime"

export default function PeakRequestTimesPage() {
  const { peakRequestTimes, isLoading, isError, error, refetch } = usePeakRequestTimes()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [visualizationType, setVisualizationType] = useState<string>("heatmap")

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setTimeout(() => {
        setIsRefreshing(false)
      }, 600)
    })
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Análisis de solicitudes</h1>
          <p className="text-muted-foreground">Visualización de patrones de solicitudes por tiempo</p>
        </div>
        <div className="flex items-center gap-4">
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
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Horas pico de solicitudes</CardTitle>
            <CardDescription>Análisis de patrones de solicitudes por tiempo</CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <Tabs
              defaultValue="heatmap"
              value={visualizationType}
              onValueChange={setVisualizationType}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="heatmap">Mapa de calor</TabsTrigger>
                <TabsTrigger value="dayOfWeek">Por día</TabsTrigger>
                <TabsTrigger value="hourOfDay">Por hora</TabsTrigger>
              </TabsList>

              <TabsContent value="heatmap" className="mt-4">
                <PeakRequestTimesVisualization
                  peakRequestTimes={peakRequestTimes || []}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  visualizationType="heatmap"
                />
              </TabsContent>

              <TabsContent value="dayOfWeek" className="mt-4">
                <PeakRequestTimesVisualization
                  peakRequestTimes={peakRequestTimes || []}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  visualizationType="dayOfWeek"
                />
              </TabsContent>

              <TabsContent value="hourOfDay" className="mt-4">
                <PeakRequestTimesVisualization
                  peakRequestTimes={peakRequestTimes || []}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  visualizationType="hourOfDay"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

