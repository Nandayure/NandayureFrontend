"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircleIcon, XCircleIcon, ClockIcon, FileTextIcon } from "lucide-react"

interface SummaryCardsProps {
  totalRequests: number
  lastUpdated: string
  totalApproved: number
  totalRejected: number
  totalPending: number
}

export function SummaryCards({
  totalRequests,
  lastUpdated,
  totalApproved,
  totalRejected,
  totalPending,
}: SummaryCardsProps) {
  // Formateamos la fecha para mostrarla de manera amigable
  const formattedDate = new Date(lastUpdated).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Solicitudes</CardTitle>
          <FileTextIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRequests}</div>
          <p className="text-xs text-muted-foreground">Última actualización: {formattedDate}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Aprobadas</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApproved}</div>
          <p className="text-xs text-muted-foreground">
            {((totalApproved / totalRequests) * 100).toFixed(1)}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Rechazadas</CardTitle>
          <XCircleIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRejected}</div>
          <p className="text-xs text-muted-foreground">
            {((totalRejected / totalRequests) * 100).toFixed(1)}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
          <ClockIcon className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPending}</div>
          <p className="text-xs text-muted-foreground">
            {((totalPending / totalRequests) * 100).toFixed(1)}% del total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

