"use client"

import { PeakRequestTimesVisualization } from "@/components/charts/peak-request-times-visualization"

export default function PeakRequestTimesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Análisis de Solicitudes</h1>
        <p className="text-muted-foreground">Visualización de patrones de solicitudes por tiempo</p>
      </div>

      <div className="space-y-4">
        <PeakRequestTimesVisualization />
      </div>
    </div>
  )
}

